package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.dto.ExerciseListResponse;
import com.sustech.cs304.project.peakform.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/exercises")
public class ExerciseController {

    private final ExerciseService exerciseService;

    @GetMapping
    public ResponseEntity<List<ExerciseListResponse>> getAllExercises() {
        return ResponseEntity.ok(exerciseService.getAllExercises());
    }
}