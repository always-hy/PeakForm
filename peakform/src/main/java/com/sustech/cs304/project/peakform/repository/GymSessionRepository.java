package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.GymSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GymSessionRepository extends JpaRepository<GymSession, Long> {
    List<GymSession> findByGym_GymId(Long gymId);
}
