package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
}
