package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.dto.ExerciseListResponse;
import com.sustech.cs304.project.peakform.repository.ExerciseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;

    @Cacheable(value = "exerciseList")
    public List<ExerciseListResponse> getAllExercises() {
        return exerciseRepository.findAll().stream()
                .map(ex -> new ExerciseListResponse(
                        ex.getExerciseId(),
                        ex.getExerciseName(),
                        ex.getDescription(),
                        ex.getTargetMuscleGroup()
                )).toList();
    }
}
