package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.GymSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GymScheduleRepository extends JpaRepository<GymSchedule, Long> {
    List<GymSchedule> findByGym_GymId(Long gymId);
}
