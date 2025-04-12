package com.sustech.cs304.project.peakform.dto;

import java.util.List;

public record WorkoutPlanRequest(
        List<WorkoutExerciseRequest> exercises
) {
    public record WorkoutExerciseRequest(
            Long exerciseId,
            String day,
            Integer sets,
            String reps
    ) {
    }
}
