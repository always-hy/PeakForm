package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.UserAchievement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAchievementRepository extends JpaRepository<UserAchievement, Long> {
}
