package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.WorkoutExercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutExerciseRepository extends JpaRepository<WorkoutExercise, Long> {
}
