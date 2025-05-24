package com.sustech.cs304.project.peakform.config;

import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.domain.UserStat;
import com.sustech.cs304.project.peakform.domain.UserTarget;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import com.sustech.cs304.project.peakform.repository.UserStatRepository;
import com.sustech.cs304.project.peakform.repository.UserTargetRepository;
import com.sustech.cs304.project.peakform.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.UUID;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserRepository userRepository;
    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserTargetRepository userTargetRepository;
    private final UserStatRepository userStatRepository;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Allow preflight requests
                        .requestMatchers("/login", "/user/register", "/user/verify-email", "/user/search/**", "/gyms").permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginProcessingUrl("/login")
                        .successHandler((request, response, authentication) -> {
                            response.setStatus(HttpStatus.OK.value());
                            response.setContentType("application/json");
                            User user = userRepository.findByEmail(authentication.getName())
                                    .orElseThrow(() -> new RuntimeException("User not found"));
                            response.getWriter().write("{\"message\": \"Login successful\", \"userUuid\": \"" + user.getUserUuid() + "\"}");
                        })
                        .failureHandler((request, response, exception) -> {
                            response.setStatus(HttpStatus.UNAUTHORIZED.value());
                            response.setContentType("application/json");
                            response.getWriter().write("{\"message\": \"Login failed: " + exception.getMessage() + "\"}");
                        })
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/login?logout")
                        .permitAll()
                        .addLogoutHandler((request, response, auth) -> {
                            HttpSession session = request.getSession(false);
                            System.out.println("Logout handler triggered for session: " + session);
                            if (session != null) {
                                session.invalidate();
                                System.out.println("Session invalidated");
                            }
                        })
                )
                .oauth2Login(oauth2 -> oauth2
                                .loginPage("/login")
                                .successHandler((request, response, authentication) -> {
                                    OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
                                    String email = oauthUser.getAttribute("email");
                                    if (email == null) {
                                        response.sendError(HttpStatus.BAD_REQUEST.value(), "Email not provided by provider");
                                        return;
                                    }
                                    String name = oauthUser.getAttribute("name");
                                    User user = userRepository.findByEmail(email)
                                            .orElseGet(() -> {
                                                System.out.println("Creating new user with email: " + email);
                                                return createNewUserWithDefaults(email, name);
                                            });
                                    response.setStatus(HttpStatus.OK.value());
                                    response.setContentType("application/json");
                                    response.getWriter().write("{\"message\": \"Login successful\", \"userUuid\": \"" + user.getUserUuid() + "\"}");
//                            response.sendRedirect("http://localhost:3000/dashboard");
                                })
                                .failureHandler((request, response, exception) -> {
                                    System.out.println("OAuth2 Failure - Exception: " + exception.getMessage());
                                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                                    response.setContentType("application/json");
                                    response.getWriter().write("{\"message\": \"OAuth login failed: " + exception.getMessage() + "\"}");
                                })
                                .permitAll()
                )
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setStatus(HttpStatus.UNAUTHORIZED.value());
                            response.setContentType("application/json");
                            response.getWriter().write("{\"message\": \"Unauthorized\"}");
                        })
                );

        return http.build();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "https://peak-form-two.vercel.app"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    private User createNewUserWithDefaults(String email, String name) {
        User newUser = User.builder()
                .userUuid(UUID.randomUUID())
                .username(name != null ? name : email.split("@")[0])
                .email(email)
                .password("")
                .age(99)
                .gender(User.Gender.OTHER)
                .emailVerified(true)
                .verificationToken(null)
                .isSubscribed(false)
                .build();

        UserTarget userTarget = UserTarget.builder()
                .user(newUser)
                .targetWeight(0F)
                .targetWaterIntake(0F)
                .targetCaloriesBurned(0)
                .targetWorkoutDuration(0)
                .build();

        UserStat userStat = UserStat.builder()
                .user(newUser)
                .date(LocalDate.now())
                .weight(0F)
                .height(0F)
                .waterIntake(0F)
                .caloriesBurned(0)
                .workoutDuration(0)
                .build();

        userRepository.save(newUser);
        userTargetRepository.save(userTarget);
        userStatRepository.save(userStat);

        return newUser;
    }
}