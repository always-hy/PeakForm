package com.sustech.cs304.project.peakform.dto;

import java.io.Serializable;
import java.util.List;

public record WorkoutPlanResponse(
        Long workoutId,
        Boolean isActive,
        List<WorkoutExerciseResponse> exercises
) implements Serializable {
    public record WorkoutExerciseResponse(
            Long exerciseId,
            String exerciseName,
            String description,
            String targetMuscleGroup,
            String day,
            Integer sets,
            String reps
    ) implements Serializable {
    }
}
