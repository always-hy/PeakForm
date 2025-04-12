package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.Exercise;
import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.domain.Workout;
import com.sustech.cs304.project.peakform.domain.WorkoutExercise;
import com.sustech.cs304.project.peakform.dto.WorkoutPlanRequest;
import com.sustech.cs304.project.peakform.dto.WorkoutPlanResponse;
import com.sustech.cs304.project.peakform.repository.ExerciseRepository;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import com.sustech.cs304.project.peakform.repository.WorkoutExerciseRepository;
import com.sustech.cs304.project.peakform.repository.WorkoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WorkoutService {

    private final UserRepository userRepository;
    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;
    private final WorkoutExerciseRepository workoutExerciseRepository;

    public ResponseEntity<String> createWorkoutPlan(UUID userUuid, WorkoutPlanRequest request) {
        Optional<User> userOptional = userRepository.findById(userUuid);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        User user = userOptional.get();

        Workout workout = Workout.builder()
                .user(user)
                .build();
        workoutRepository.save(workout);

        List<WorkoutExercise> workoutExercises = new ArrayList<>();
        for (WorkoutPlanRequest.WorkoutExerciseRequest ex : request.exercises()) {
            Optional<Exercise> exerciseOptional = exerciseRepository.findById(ex.exerciseId());
            if (exerciseOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Exercise ID " + ex.exerciseId() + " not found.");
            }

            Exercise exercise = exerciseOptional.get();

            WorkoutExercise workoutExercise = WorkoutExercise.builder()
                    .workout(workout)
                    .exercise(exercise)
                    .day(WorkoutExercise.Day.valueOf(ex.day()))
                    .sets(ex.sets())
                    .reps(ex.reps())
                    .build();

            workoutExercises.add(workoutExercise);
        }

        workoutExerciseRepository.saveAll(workoutExercises);

        return ResponseEntity.status(HttpStatus.OK).body("Workout plan created successfully.");
    }

    public WorkoutPlanResponse getWorkoutPlan(UUID userUuid) {
        Optional<User> userOptional = userRepository.findById(userUuid);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found.");
        }

        Optional<Workout> workoutOptional = workoutRepository.findByUser_UserUuid(userUuid);
        if (workoutOptional.isEmpty()) {
            throw new IllegalArgumentException("No workout plan found for the user.");
        }

        Workout workout = workoutOptional.get();
        Long workoutId = workout.getWorkoutId();

        List<WorkoutExercise> workoutExercises = workoutExerciseRepository.findByWorkout_WorkoutId(workoutId);

        List<WorkoutPlanResponse.WorkoutExerciseResponse> exercises = new ArrayList<>();
        for (WorkoutExercise workoutExercise : workoutExercises) {
            exercises.add(new WorkoutPlanResponse.WorkoutExerciseResponse(
                    workoutExercise.getExercise().getExerciseId(),
                    workoutExercise.getExercise().getExerciseName(),
                    workoutExercise.getExercise().getDescription(),
                    workoutExercise.getExercise().getTargetMuscleGroup(),
                    workoutExercise.getDay().toString(),
                    workoutExercise.getSets(),
                    workoutExercise.getReps()
            ));
        }

        return new WorkoutPlanResponse(userUuid.toString(), exercises);
    }
}
