package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.GymSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface GymSessionRepository extends JpaRepository<GymSession, Long> {

    Optional<GymSession> findByGym_GymIdAndGymSessionId(Long gymId, Long gymSessionId);

    List<GymSession> findByGym_GymIdAndDateIn(Long gymId, List<LocalDate> dates);
}
