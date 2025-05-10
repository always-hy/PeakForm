package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.domain.UserStat;
import com.sustech.cs304.project.peakform.domain.UserTarget;
import com.sustech.cs304.project.peakform.dto.RegistrationRequest;
import com.sustech.cs304.project.peakform.dto.UserRequest;
import com.sustech.cs304.project.peakform.dto.UserResponse;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import com.sustech.cs304.project.peakform.repository.UserStatRepository;
import com.sustech.cs304.project.peakform.repository.UserTargetRepository;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final RestTemplate restTemplate;
    private final EmailService emailService;
    private final UserTargetRepository userTargetRepository;
    private final UserStatRepository userStatRepository;
    private final FirebaseStorageService firebaseStorageService;

    // This method is used by Spring Security to load user details by email
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    /**
     * AI-generated-content
     * tool: DeepSeek
     * version: latest
     * usage: I asked the tool to introduce me the workflow of recaptcha and email verification.
     * I referred to the idea and template provided and implemented the function with different tutorials online.
     */
    public ResponseEntity<String> registerUser(RegistrationRequest registrationRequest) {
        if (registrationRequest.username() == null || registrationRequest.email() == null || registrationRequest.password() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username, email, and password are required.");
        }

        if (userRepository.findByEmail(registrationRequest.email()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already registered.");
        }

//        String recaptchaResponse = registrationRequest.recaptchaResponse();
//        if (!verifyRecaptcha(recaptchaResponse)) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("reCAPTCHA verification failed.");
//        }

        String hashedPassword = passwordEncoder.encode(registrationRequest.password());
        String verificationToken = UUID.randomUUID().toString();

        User user = User.builder()
                .userUuid(UUID.randomUUID())
                .username(registrationRequest.username())
                .email(registrationRequest.email())
                .password(hashedPassword)
                .age(registrationRequest.age() != null ? registrationRequest.age() : 0)
                .gender(registrationRequest.gender() != null ? registrationRequest.gender() : User.Gender.OTHER)
                .emailVerified(false)
                .verificationToken(verificationToken)
                .isSubscribed(false)
                .build();

        UserTarget userTarget = UserTarget.builder()
                .user(user)
                .targetWeight(0F)
                .targetWaterIntake(0F)
                .targetCaloriesBurned(0)
                .targetWorkoutDuration(0)
                .build();

        UserStat userStat = UserStat.builder()
                .user(user)
                .date(LocalDate.now())
                .weight(0F)
                .height(0F)
                .waterIntake(0F)
                .caloriesBurned(0)
                .workoutDuration(0)
                .build();

        userRepository.save(user);
        userTargetRepository.save(userTarget);
        userStatRepository.save(userStat);
        emailService.sendVerificationEmail(user.getEmail(), verificationToken);
        return ResponseEntity.status(HttpStatus.OK).body("Registration successful. Please check your email to verify your account.");
    }

    private boolean verifyRecaptcha(String recaptchaResponse) {
        Dotenv dotenv = Dotenv.load();
        // Bypass reCAPTCHA for testing
        if ("TEST_RECAPTCHA_RESPONSE".equals(recaptchaResponse)) {
            return true;
        }

        String recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify";
        String recaptchaSecret = dotenv.get("RECAPTCHA_SECRET_KEY");
        String requestUrl = recaptchaUrl + "?secret=" + recaptchaSecret + "&response=" + recaptchaResponse;

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(requestUrl, null, Map.class);
            if (response.getBody() != null && response.getBody().get("success").equals(true)) {
                return true;
            }
        } catch (Exception e) {
            System.err.println("reCAPTCHA verification error: " + e.getMessage());
        }
        return false;
    }

    @Cacheable(value = "user", key = "#userUuid")
    public Optional<UserResponse> getUser(UUID userUuid) {
        Optional<User> userOptional = userRepository.findById(userUuid);

        if (userOptional.isEmpty()) {
            return Optional.empty();
        }

        User user = userOptional.get();
        String profilePictureUrl = firebaseStorageService.getFileUrl("user-profile/" + userUuid + ".jpg")
                .getBody();

        UserResponse userResponse = new UserResponse(
                user.getRealUsername(),
                user.getEmail(),
                user.getAge(),
                user.getGender(),
                user.getBio(),
                profilePictureUrl
        );

        return Optional.of(userResponse);
    }

    @CacheEvict(value = "user", key = "#userUuid")
    public ResponseEntity<String> updateUser(UUID userUuid, UserRequest userRequest) {
        Optional<User> userOptional = userRepository.findById(userUuid);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        User user = userOptional.get();
        user.setUsername(userRequest.username());
        user.setAge(userRequest.age());
        user.setGender(userRequest.gender());
        user.setBio(userRequest.bio());

        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.OK).body("User updated successfully.");
    }
}
