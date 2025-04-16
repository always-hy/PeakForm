package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.dto.RegistrationRequest;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import com.sustech.cs304.project.peakform.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping("/a")
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> getUserA(@RequestParam("userUuid") UUID userUuid) {
        return userService.getUserA(userUuid);
    }

    @GetMapping("/b")
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public Optional<User> getUserB(@RequestParam("userUuid") UUID userUuid) {
        return userService.getUserB(userUuid);
    }

    @Transactional
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegistrationRequest registrationRequest) {
        return userService.registerUser(registrationRequest);
    }

    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        return userRepository.findByVerificationToken(token)
                .map(user -> {
                    user.setEmailVerified(true);
                    user.setVerificationToken(null); // Clear verification token
                    userRepository.save(user);
                    return ResponseEntity.status(HttpStatus.OK).body("Email verified successfully.");
                })
                .orElse(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid verification token."));
    }
}