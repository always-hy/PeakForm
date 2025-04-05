package com.sustech.cs304.project.peakform.dto;

import java.util.List;

public record WorkoutPlanRequest(
        String userUuid,
        List<WorkoutExerciseRequest> exercises
) {
    public static record WorkoutExerciseRequest(
            Long exerciseId,
            String day,
            Integer sets,
            String reps
    ) {}
}
