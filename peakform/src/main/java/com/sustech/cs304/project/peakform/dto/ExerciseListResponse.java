package com.sustech.cs304.project.peakform.dto;

import java.io.Serializable;

public record ExerciseListResponse(
        Long exerciseId,
        String exerciseName,
        String description,
        String targetMuscleGroup
) implements Serializable {
}
