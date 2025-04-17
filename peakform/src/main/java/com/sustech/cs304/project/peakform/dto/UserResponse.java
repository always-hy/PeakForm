package com.sustech.cs304.project.peakform.dto;

import com.sustech.cs304.project.peakform.domain.User;

import java.io.Serializable;

public record UserResponse (
        String username,
        String email,
        Integer age,
        User.Gender gender,
        String bio,
        String url
) implements Serializable {}