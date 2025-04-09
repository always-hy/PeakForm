package com.sustech.cs304.project.peakform.dto;

public record ExerciseListResponse(
        Long exerciseId,
        String exerciseName,
        String description,
        String targetMuscleGroup
) {
}
