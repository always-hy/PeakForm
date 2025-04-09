package com.sustech.cs304.project.peakform.dto;

import java.time.LocalDate;

public record UserStatResponse(
        Long userStatId,
        LocalDate date,
        Float weight,
        Float height,
        Float waterIntake,
        Integer caloriesBurned,
        Integer workoutDuration
) {
}
