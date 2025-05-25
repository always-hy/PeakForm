package com.sustech.cs304.project.peakform.dto;

import com.sustech.cs304.project.peakform.domain.User;

import java.io.Serializable;

public record UserProfileResponse(
        String username,
        String email,
        User.Gender gender,
        Integer age,
        String bio,
        String profilePictureUrl,
        Integer followersCount,
        Integer followingsCount,
        Boolean isFollowing
) implements Serializable {
}
