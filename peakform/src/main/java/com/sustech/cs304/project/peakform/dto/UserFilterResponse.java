package com.sustech.cs304.project.peakform.dto;

public record UserFilterResponse(
        String username,
        String email,
        String profilePictureUrl
) {
}
