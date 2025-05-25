package com.sustech.cs304.project.peakform.dto;

public record TopBenchPressRecordResponse(
        String username,
        String email,
        String profilePictureUrl,
        Float benchPressPr
) {
}
