package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.dto.RegistrationRequest;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public ResponseEntity<String> registerUser(RegistrationRequest registrationRequest) {
        if (registrationRequest.getUsername() == null || registrationRequest.getEmail() == null || registrationRequest.getPassword() == null) {
            return ResponseEntity.status(404).body("Username, email, and password are required.");
        }

        if (userRepository.findByEmail(registrationRequest.getEmail()).isPresent()) {
            return ResponseEntity.status(404).body("Email is already registered.");
        }

        String hashedPassword = passwordEncoder.encode(registrationRequest.getPassword());

        User user = User.builder()
                .username(registrationRequest.getUsername())
                .email(registrationRequest.getEmail())
                .password(hashedPassword)
                .age(registrationRequest.getAge() != null ? registrationRequest.getAge() : 0)
                .gender(registrationRequest.getGender() != null ? registrationRequest.getGender() : User.Gender.OTHER)
                .build();

        userRepository.save(user);
        return ResponseEntity.status(200).body("Registration successful.");
    }
}