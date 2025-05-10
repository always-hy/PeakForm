package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.dto.AIWorkoutRequest;
import com.sustech.cs304.project.peakform.dto.RegistrationRequest;
import com.sustech.cs304.project.peakform.dto.UserRequest;
import com.sustech.cs304.project.peakform.dto.UserResponse;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import com.sustech.cs304.project.peakform.service.AIWorkoutService;
import com.sustech.cs304.project.peakform.service.FirebaseStorageService;
import com.sustech.cs304.project.peakform.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final AIWorkoutService aiWorkoutService;
    private final FirebaseStorageService firebaseStorageService;
    private final UserRepository userRepository;

    @GetMapping("/details")
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<UserResponse> getUser(@RequestParam("userUuid") UUID userUuid) {
        Optional<UserResponse> userResponse = userService.getUser(userUuid);
        return userResponse.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @Transactional
    @PutMapping("/update")
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> updateUser(@RequestParam("userUuid") UUID userUuid, @RequestBody UserRequest userRequest) {
        return userService.updateUser(userUuid, userRequest);
    }

    @Transactional
    @PostMapping("/upload-profile")
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> uploadUserProfile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") UUID userUuid) {
        return firebaseStorageService.uploadFile(file, "user-profile/" + userUuid.toString() + ".jpg");
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

    @Transactional
    @PostMapping("/ai-generate-workout")
    @PreAuthorize("#request.userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> generateWorkoutPlan(
            @RequestBody AIWorkoutRequest request) {
        return aiWorkoutService.generateWorkoutPlan(request);
    }
}