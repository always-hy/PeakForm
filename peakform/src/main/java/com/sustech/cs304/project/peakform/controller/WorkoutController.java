package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.dto.WorkoutPlanRequest;
import com.sustech.cs304.project.peakform.dto.WorkoutPlanResponse;
import com.sustech.cs304.project.peakform.service.WorkoutService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/workout-plans")
public class WorkoutController {

    private final WorkoutService workoutService;

    @PostMapping("/create")
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    @Transactional
    public ResponseEntity<String> createWorkoutPlan(@RequestParam("userUuid") UUID userUuid, @RequestBody WorkoutPlanRequest request) {
        return workoutService.createWorkoutPlan(userUuid, request);
    }

    @GetMapping
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<List<WorkoutPlanResponse>> getWorkoutPlan(@RequestParam("userUuid") UUID userUuid) {
        List<WorkoutPlanResponse> response = workoutService.getWorkoutPlan(userUuid);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{workoutId}/activate")
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> activateWorkoutPlan(@PathVariable Long workoutId, @RequestParam UUID userUuid) {
        return workoutService.activateWorkout(workoutId, userUuid);
    }
}
