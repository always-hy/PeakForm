package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.Exercise;
import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.domain.UserStat;
import com.sustech.cs304.project.peakform.domain.UserTarget;
import com.sustech.cs304.project.peakform.dto.AIWorkoutRequest;
import com.sustech.cs304.project.peakform.dto.UserStatResponse;
import com.sustech.cs304.project.peakform.dto.UserTargetResponse;
import com.sustech.cs304.project.peakform.dto.WorkoutPlanRequest;
import com.sustech.cs304.project.peakform.repository.ExerciseRepository;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class AIWorkoutService {
    private final WorkoutService workoutService;
    private final UserStatService userStatService;
    private final UserTargetService userTargetService;
    private final OpenAIService openAIService;
    private final UserRepository userRepository;
    private final ExerciseRepository exerciseRepository;

    public ResponseEntity<String> generateWorkoutPlan(AIWorkoutRequest request) {
        User currentUser = userRepository.findById(UUID.fromString(request.userUuid())).orElse(null);

        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not retrieve user details.");
        }

        if (!currentUser.isSubscribed()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Please subscribe to a premium plan to use the AI workout generator.");
        }

        // Fetch user stats and targets
         UserStatResponse userStat = userStatService.getUserStat(UUID.fromString(request.userUuid()));
         Optional<UserTargetResponse> userTarget = userTargetService.getUserTarget(UUID.fromString(request.userUuid()));
         List<Exercise> availableExercises = exerciseRepository.findAll();

        // Construct prompt
        String prompt = buildPrompt(currentUser, userStat, userTarget, availableExercises, request);

        try {
            // Call OpenAI API via OpenAIService
            String aiResponse = openAIService.getOpenAIResponse(prompt);
            String cleanedJson = aiResponse
                    .replaceAll("```json\\n", "")
                    .replaceAll("```\\n", "")
                    .replaceAll("```", "")
                    .trim();
            return ResponseEntity.status(HttpStatus.OK).body(cleanedJson);
        } catch (Exception e) {
            System.err.println("Error processing AI response: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing AI response: " + e.getMessage());
        }
    }

    private String buildPrompt(User user, UserStatResponse userStat, Optional<UserTargetResponse> userTarget, List<Exercise> availableExercises, AIWorkoutRequest request) {
        StringBuilder promptBuilder = new StringBuilder();
        promptBuilder.append("You are an expert fitness trainer AI. Your task is to generate a personalized " +
                "weekly workout plan based on the user's profile, goals, and available exercises.\n\n");
        promptBuilder.append("**User Profile:**\n");
        promptBuilder.append("*   Age: ").append(user.getAge()).append("\n");
        promptBuilder.append("*   Gender: ").append(user.getGender()).append("\n");
        if (userStat != null) {
            promptBuilder.append("*   Current Weight: ").append(userStat.weight()).append(" kg\n");
            promptBuilder.append("*   Height: ").append(userStat.height()).append(" cm\n");
        }

        promptBuilder.append("*   Primary Fitness Goal: ").append(request.primaryFitnessGoal()).append("\n");
         if (userTarget != null) {
             promptBuilder.append("*   Target Weight: ").append(userTarget.get().targetWeight()).append(" kg\n");
         }
        promptBuilder.append("*   Fitness Experience Level: ").append(request.experienceLevel()).append("\n");
        promptBuilder.append("*   Available Equipment: ").append(String.join(", ", request.availableEquipment())).append("\n\n");

        promptBuilder.append("**Workout Preferences:**\n");
        promptBuilder.append("*   Workout Days Per Week: ").append(request.workoutDaysPerWeek()).append("\n");
        promptBuilder.append("*   Preferred Workout Duration Per Session: ").append(request.preferredWorkoutDurationPerSessionInMinutes()).append(" minutes\n");
        promptBuilder.append("*   Focus Areas: ").append(String.join(", ", request.focusAreas())).append("\n");

        if (availableExercises != null && !availableExercises.isEmpty()) {
            promptBuilder.append("\n**Available Exercises:**\n");
            for (Exercise exercise : availableExercises) {
                promptBuilder.append("*   ID: ").append(exercise.getExerciseId())
                        .append(", Name: ").append(exercise.getExerciseName()).append("\n");
            }
        }

        promptBuilder.append("\n**Instructions for Output:**\n");
        promptBuilder.append("Generate a detailed weekly workout plan in JSON format with the following structure:\n");
        promptBuilder.append("{\n");
        promptBuilder.append("  \"exercises\": [\n");
        promptBuilder.append("    {\n");
        promptBuilder.append("      \"exerciseId\": <integer>,\n");
        promptBuilder.append("      \"day\": \"<MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY>\",\n");
        promptBuilder.append("      \"sets\": <integer>,\n");
        promptBuilder.append("      \"reps\": \"<string, e.g., '8-12' or '10'>\"\n");
        promptBuilder.append("    }\n");
        promptBuilder.append("  ]\n");
        promptBuilder.append("}\n");
        promptBuilder.append("Ensure exerciseId corresponds to the IDs provided in the Available Exercises list. "
                + "The plan should align with the user's fitness goals, experience level, and preferences.");
        promptBuilder.append("Please return only the JSON object as specified, without any additional text or explanations.\n");

        return promptBuilder.toString();
    }

    private WorkoutPlanRequest parseAIResponse(String aiResponse) {
        try {
            com.fasterxml.jackson.databind.ObjectMapper objectMapper = new com.fasterxml.jackson.databind.ObjectMapper();
            return objectMapper.readValue(aiResponse, WorkoutPlanRequest.class);
        } catch (com.fasterxml.jackson.core.JsonProcessingException e) {
            System.err.println("Failed to parse AI JSON response: " + e.getMessage());
            return null;
        }
    }
}
