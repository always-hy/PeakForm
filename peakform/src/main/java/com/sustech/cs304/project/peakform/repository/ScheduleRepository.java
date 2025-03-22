package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
}
