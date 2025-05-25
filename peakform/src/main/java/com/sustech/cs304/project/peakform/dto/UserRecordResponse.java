package com.sustech.cs304.project.peakform.dto;

import java.io.Serializable;

public record UserRecordResponse(
        String userUuid,
        Integer workoutStreak,
        Integer waterIntakeStreak,
        Float benchPressPr,
        Float squatPr,
        Float deadliftPr
) implements Serializable {
}