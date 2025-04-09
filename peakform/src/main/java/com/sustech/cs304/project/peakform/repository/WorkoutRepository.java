package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.Optional;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    Optional<Workout> findByUser_UserUuid(UUID userUUid);
}
