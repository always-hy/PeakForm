package com.sustech.cs304.project.peakform.dto;

public record TopSquatRecordResponse(
        String username,
        String email,
        String profilePictureUrl,
        Float squatPr
) {
}
