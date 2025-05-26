package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.UserAchievement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserAchievementRepository extends JpaRepository<UserAchievement, Long> {

    List<UserAchievement> findByUser_UserUuid(UUID userUuid);

    boolean existsByUser_UserUuidAndAchievement_AchievementId(UUID userUuid, Long achievementId);
}
