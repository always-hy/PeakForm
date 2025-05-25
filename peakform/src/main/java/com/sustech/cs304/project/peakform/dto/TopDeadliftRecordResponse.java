package com.sustech.cs304.project.peakform.dto;

public record TopDeadliftRecordResponse(
        String username,
        String email,
        String profilePictureUrl,
        Float deadliftPr
) {
}
