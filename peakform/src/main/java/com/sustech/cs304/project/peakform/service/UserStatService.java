package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.*;
import com.sustech.cs304.project.peakform.dto.UserStatRequest;
import com.sustech.cs304.project.peakform.dto.UserStatResponse;
import com.sustech.cs304.project.peakform.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserStatService {

    private final UserRepository userRepository;
    private final UserStatRepository userStatRepository;
    private final UserTargetRepository userTargetRepository;
    private final AchievementRepository achievementRepository;
    private final UserAchievementRepository userAchievementRepository;

    @CacheEvict(value = "userStat", key = "#userUuid")
    public ResponseEntity<String> updateUserStat(UUID userUuid, UserStatRequest request) {
        Optional<User> userOptional = userRepository.findById(userUuid);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        User user = userOptional.get();
        LocalDate today = LocalDate.now();

        Optional<UserStat> existingStatOptional = userStatRepository.findByUserAndDate(user, today);
        if (existingStatOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User statistics record not found.");
        }

        UserStat userStat = existingStatOptional.get();
        userStat.setWeight(request.weight());
        userStat.setHeight(request.height());
        userStat.setWaterIntake(request.waterIntake());
        userStat.setCaloriesBurned(request.caloriesBurned());
        userStat.setWorkoutDuration(request.workoutDuration());

        userStatRepository.save(userStat);

        Float currentWeight = userStat.getWeight();
        Float targetWeight = userTargetRepository.findByUser_UserUuid(userUuid)
                .map(UserTarget::getTargetWeight)
                .orElse(null);

        boolean achievementUnlocked = false;
        String unlockedAchievementName = null;
        Optional<Achievement> achievementOptional = achievementRepository.findByAchievementName("Target Weight Reached");

        if (currentWeight != null && targetWeight != null && achievementOptional.isPresent()) {
            Achievement achievement = achievementOptional.get();
            boolean targetAchieved = currentWeight.equals(targetWeight);
            boolean alreadyUnlocked = userAchievementRepository.existsByUser_UserUuidAndAchievement_AchievementId(userUuid, achievement.getAchievementId());

            if (targetAchieved && !alreadyUnlocked) {
                UserAchievement userAchievement = UserAchievement.builder()
                        .user(user)
                        .achievement(achievement)
                        .achievedAt(LocalDateTime.now())
                        .build();
                userAchievementRepository.save(userAchievement);

                achievementUnlocked = true;
                unlockedAchievementName = achievement.getAchievementName();
            }
        }

        String responseMessage = "User statistics updated successfully.";
        if (achievementUnlocked) {
            responseMessage += " New achievement unlocked: \"" + unlockedAchievementName + "\"!";
        }

        return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
    }

    @Cacheable(value = "userStat", key = "#userUuid")
    public UserStatResponse getUserStat(UUID userUuid) {
        User user = userRepository.findById(userUuid)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));

        LocalDate today = LocalDate.now();

        UserStat userStat = userStatRepository.findByUserAndDate(user, today)
                .orElseThrow(() -> new IllegalStateException("UserStat record should exist but was not found."));

        return new UserStatResponse(
                userStat.getUserStatId(),
                userStat.getDate(),
                userStat.getWeight(),
                userStat.getHeight(),
                userStat.getWaterIntake(),
                userStat.getCaloriesBurned(),
                userStat.getWorkoutDuration()
        );
    }

    @CacheEvict(value = "userStat", key = "#userUuid")
    public ResponseEntity<String> resetUserStat(UUID userUuid) {
        Optional<User> userOptional = userRepository.findById(userUuid);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        User user = userOptional.get();
        LocalDate today = LocalDate.now();

        UserStat userStat = userStatRepository.findByUserAndDate(user, today)
                .orElseThrow(() -> new IllegalStateException("UserStat record should exist but was not found."));

        userStat.setWeight(0F);
        userStat.setHeight(0F);
        userStat.setWaterIntake(0F);
        userStat.setCaloriesBurned(0);
        userStat.setWorkoutDuration(0);

        userStatRepository.save(userStat);

        return ResponseEntity.status(HttpStatus.OK).body("User statistics reset successfully.");
    }

    // midnight metrics reset
    @Scheduled(cron = "0 0 0 * * ?")
    public void resetStatsAtStartOfDay() {
        LocalDate today = LocalDate.now();
        List<User> users = userRepository.findAll();

        for (User user : users) {
            UserStat newStat = new UserStat();
            newStat.setUser(user);
            newStat.setDate(today.plusDays(1));
            newStat.setWeight(0F);
            newStat.setHeight(0F);
            newStat.setWaterIntake(0F);
            newStat.setCaloriesBurned(0);
            newStat.setWorkoutDuration(0);

            userStatRepository.save(newStat);
        }

        System.out.println("New user statistics have been reset for today: " + today);
    }

    @Cacheable(value = "userStatHistory", key = "#userUuid")
    public List<UserStatResponse> getUserStatHistory(UUID userUuid) {
        List<UserStat> stats = userStatRepository.findAllByUser_UserUuidOrderByDateAsc(userUuid);
        return stats.stream().map(stat -> new UserStatResponse(
                stat.getUserStatId(),
                stat.getDate(),
                stat.getWeight(),
                stat.getHeight(),
                stat.getWaterIntake(),
                stat.getCaloriesBurned(),
                stat.getWorkoutDuration()
        )).toList();
    }
}
