package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findByUser_UserUuidOrderByIsActiveDesc(UUID userUuid);
}
