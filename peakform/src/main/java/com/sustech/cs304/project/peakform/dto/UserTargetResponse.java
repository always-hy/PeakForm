package com.sustech.cs304.project.peakform.dto;

import java.io.Serializable;
import java.util.UUID;

public record UserTargetResponse(
        UUID userUuid,
        Long userTargetId,
        Float targetWeight,
        Float targetWaterIntake,
        Integer targetCaloriesBurned,
        Integer targetWorkoutDuration
) implements Serializable {
}
