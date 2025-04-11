package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.dto.WorkoutPlanRequest;
import com.sustech.cs304.project.peakform.dto.WorkoutPlanResponse;
import com.sustech.cs304.project.peakform.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/workout-plan")
public class WorkoutController {

    private final WorkoutService workoutService;

    @PostMapping
    @PreAuthorize("#request.userUuid() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> createWorkoutPlan(@RequestBody WorkoutPlanRequest request) {
        return workoutService.createWorkoutPlan(request);
    }

    @GetMapping
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public WorkoutPlanResponse getWorkoutPlan(@RequestParam("userUuid") UUID userUuid) {
        return workoutService.getWorkoutPlan(userUuid);
    }
}
