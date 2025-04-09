package com.sustech.cs304.project.peakform.dto;

public record UserTargetRequest(
        Float targetWeight,
        Float targetWaterIntake,
        Integer targetCaloriesBurned,
        Integer targetWorkoutDuration
) {
}

