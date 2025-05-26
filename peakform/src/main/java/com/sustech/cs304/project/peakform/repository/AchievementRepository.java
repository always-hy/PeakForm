package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {

    Optional<Achievement> findByAchievementName(String achievementName);
}
