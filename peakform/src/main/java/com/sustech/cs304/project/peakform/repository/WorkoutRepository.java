package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.Workout;
import com.sustech.cs304.project.peakform.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    Optional<Workout> findByUser(User user);
}
