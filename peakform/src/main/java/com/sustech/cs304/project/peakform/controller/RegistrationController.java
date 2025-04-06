package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.dto.RegistrationRequest;
import com.sustech.cs304.project.peakform.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Transactional
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class RegistrationController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegistrationRequest registrationRequest) {
        return userService.registerUser(registrationRequest);
    }
}