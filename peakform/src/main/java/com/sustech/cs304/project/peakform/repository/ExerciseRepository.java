package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
}
