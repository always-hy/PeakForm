package com.sustech.cs304.project.peakform.dto;

import com.sustech.cs304.project.peakform.domain.User;

public record RegistrationRequest (
     String username,
     String email,
     String password,
     Integer age,
     User.Gender gender
//     String recaptchaResponse
){}