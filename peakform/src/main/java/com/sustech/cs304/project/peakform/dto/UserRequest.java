package com.sustech.cs304.project.peakform.dto;

import com.sustech.cs304.project.peakform.domain.User;

public record UserRequest(
        String username,
        Integer age,
        User.Gender gender,
        String bio
) {
}
