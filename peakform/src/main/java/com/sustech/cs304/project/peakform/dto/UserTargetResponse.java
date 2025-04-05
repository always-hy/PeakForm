package com.sustech.cs304.project.peakform.dto;

import java.util.UUID;

public record UserTargetResponse(
        UUID userUuid,
        Long userTargetId,
        Float targetWeight,
        Float targetWaterIntake,
        Integer targetCaloriesBurned,
        Integer targetWorkoutDuration
) {

}
