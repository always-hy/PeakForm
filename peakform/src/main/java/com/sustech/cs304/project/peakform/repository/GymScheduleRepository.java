package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.GymSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GymScheduleRepository extends JpaRepository<GymSchedule, Long> {
}
