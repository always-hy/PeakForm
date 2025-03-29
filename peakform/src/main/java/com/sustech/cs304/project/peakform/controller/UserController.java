package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        return userRepository.findByVerificationToken(token)
            .map(user -> {
                user.setEmailVerified(true);
                user.setVerificationToken(null); // Clear verification token
                userRepository.save(user);
                return ResponseEntity.status(HttpStatus.OK).body("Email verified successfully.");
//                return "redirect:http://localhost:3000/email-verified";
            })
            .orElse(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid verification token."));
    }
}