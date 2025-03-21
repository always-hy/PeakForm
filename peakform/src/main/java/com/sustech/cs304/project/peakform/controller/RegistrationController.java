package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.dto.RegistrationRequest;
import com.sustech.cs304.project.peakform.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class RegistrationController {

    private final UserService userService;

    @PostMapping("/register")
    public String registerUser(@RequestBody RegistrationRequest registrationRequest) {
        return userService.registerUser(registrationRequest);
    }
}