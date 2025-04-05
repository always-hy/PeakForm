package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.WorkoutExercise;
import com.sustech.cs304.project.peakform.domain.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutExerciseRepository extends JpaRepository<WorkoutExercise, Long> {
    List<WorkoutExercise> findByWorkout(Workout workout);
}
