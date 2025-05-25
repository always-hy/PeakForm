package com.sustech.cs304.project.peakform.dto;

public record UserRecordUpdateRequest(
        Float benchPressPr,
        Float squatPr,
        Float deadliftPr
) {
}