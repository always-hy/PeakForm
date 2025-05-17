package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.Notification;
import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.dto.NotificationResponse;
import com.sustech.cs304.project.peakform.repository.NotificationRepository;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

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

    @Transactional
    @CacheEvict(value = "notifications", key = "#userUuid", condition = "#result.statusCode == T(org.springframework.http.HttpStatus).OK")
    public ResponseEntity<String> markNotificationAsRead(UUID userUuid, Long notificationId) {
        Optional<Notification> notificationOptional = notificationRepository.findByUser_UserUuidAndNotificationId(userUuid, notificationId);
        if (notificationOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notification not found.");
        }

        Notification notification = notificationOptional.get();
        if (notification.getIsRead()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Notification already marked as read.");
        }

        notification.setIsRead(true);
        notificationRepository.save(notification);

        return ResponseEntity.ok("Notification marked as read.");
    }
}
