package com.sustech.cs304.project.peakform.dto;

import java.util.List;

public record WorkoutPlanResponse(
        String userUuid,
        List<WorkoutExerciseResponse> exercises
) {
    public record WorkoutExerciseResponse(
            Long exerciseId,
            String exerciseName,
            String description,
            String targetMuscleGroup,
            String day,
            Integer sets,
            String reps
    ) {}
}
