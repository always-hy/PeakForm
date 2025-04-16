package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.dto.WorkoutPlanRequest;
import com.sustech.cs304.project.peakform.dto.WorkoutPlanResponse;
import com.sustech.cs304.project.peakform.service.WorkoutService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/workout-plan")
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
        return workoutService.getWorkoutPlan(userUuid);
    }

    @PutMapping("/{workoutId}/activate")
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> activateWorkoutPlan(@PathVariable Long workoutId, @RequestParam UUID userUuid) {
        return workoutService.activateWorkout(workoutId, userUuid);
    }
}
