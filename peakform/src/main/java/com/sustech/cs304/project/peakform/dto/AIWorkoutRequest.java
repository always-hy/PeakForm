package com.sustech.cs304.project.peakform.dto;

import java.util.List;

public record AIWorkoutRequest(
    String userUuid,
    String primaryFitnessGoal, // e.g., Build muscle, Lose weight
    String experienceLevel, // e.g., Beginner, Intermediate, Advanced
    List<String> availableEquipment, // e.g., ["Full gym access", "Dumbbells", "Bodyweight only"]
    Integer workoutDaysPerWeek, // e.g., 3, 4, 5
    Integer preferredWorkoutDurationPerSessionInMinutes, // e.g., 45, 60, 90
    List<String> focusAreas // e.g., ["Full body", "Upper body"]
)
{
}
