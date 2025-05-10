package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.Notification;
import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.domain.Workout;
import com.sustech.cs304.project.peakform.domain.WorkoutExercise;
import com.sustech.cs304.project.peakform.dto.NotificationResponse;
import com.sustech.cs304.project.peakform.repository.NotificationRepository;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import com.sustech.cs304.project.peakform.repository.WorkoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final WorkoutRepository workoutRepository;

    private final WorkoutService workoutService;
    private final EmailService emailService;

    public void createNotification(String message, UUID userUuid) {
        User user = userRepository.findById(userUuid)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userUuid));

        Notification notification = Notification.builder()
                .message(message)
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        notificationRepository.save(notification);
    }

    @Cacheable(value = "notifications", key = "#userUuid")
    public List<NotificationResponse> getNotificationsByUserUuid(UUID userUuid) {
        List<Notification> notifications = notificationRepository.findByUser_UserUuid(userUuid);
        return notifications.stream()
                .map(notification -> new NotificationResponse(
                        notification.getNotificationId(),
                        notification.getMessage(),
                        notification.getIsRead(),
                        notification.getCreatedAt()
                ))
                .toList();
    }

    @Scheduled(cron = "0 0 18 * * *")
    public void sendWorkoutReminders() {
        DayOfWeek tomorrow = LocalDate.now().plusDays(1).getDayOfWeek();
        WorkoutExercise.Day tomorrowDay = WorkoutExercise.Day.valueOf(tomorrow.name());

        List<Workout> activeWorkouts = workoutRepository.findByIsActiveTrue();

        for (Workout workout : activeWorkouts) {
            boolean hasExerciseTomorrow = workout.getWorkoutExercises().stream()
                    .anyMatch(ex -> ex.getDay() == tomorrowDay);

            if (hasExerciseTomorrow) {
                emailService.sendWorkoutReminder(workout.getUser().getEmail(), tomorrowDay);
            }
        }
    }
}
