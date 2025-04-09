package com.sustech.cs304.project.peakform.dto;

import java.time.LocalDate;

public record UserStatRequest(
        LocalDate date,
        Float weight,
        Float height,
        Float waterIntake,
        Integer caloriesBurned,
        Integer workoutDuration
) {
}
