package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.dto.AIWorkoutRequest;
import com.sustech.cs304.project.peakform.service.AIWorkoutService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ai")
public class AIController {
    private final AIWorkoutService aiWorkoutService;

    @Transactional
    @PostMapping("/generate-workout")
    @PreAuthorize("#request.userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> generateWorkoutPlan(
            @RequestBody AIWorkoutRequest request) {
        return aiWorkoutService.generateWorkoutPlan(request);
    }
}