package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.UserSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserScheduleRepository extends JpaRepository<UserSchedule, Long> {
}
