package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.dto.RegistrationRequest;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final RestTemplate restTemplate;
    private final EmailService emailService;

    /**
     * AI-generated-content
     * tool: DeepSeek
     * version: latest
     * usage: I asked the tool to introduce me the workflow of recaptcha and email verification.
     * I referred to the idea and template provided and implemented the function with different tutorials online.
     */
    public ResponseEntity<String> registerUser(RegistrationRequest registrationRequest) {
        if (registrationRequest.getUsername() == null || registrationRequest.getEmail() == null || registrationRequest.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username, email, and password are required.");
        }

        if (userRepository.findByEmail(registrationRequest.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already registered.");
        }

        String recaptchaResponse = registrationRequest.getRecaptchaResponse();
        if (!verifyRecaptcha(recaptchaResponse)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("reCAPTCHA verification failed.");
        }

        String hashedPassword = passwordEncoder.encode(registrationRequest.getPassword());
        String verificationToken = UUID.randomUUID().toString();

        User user = User.builder()
                .username(registrationRequest.getUsername())
                .email(registrationRequest.getEmail())
                .password(hashedPassword)
                .age(registrationRequest.getAge() != null ? registrationRequest.getAge() : 0)
                .gender(registrationRequest.getGender() != null ? registrationRequest.getGender() : User.Gender.OTHER)
                .emailVerified(false)
                .verificationToken(verificationToken)
                .build();

        userRepository.save(user);
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
}