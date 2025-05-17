package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUser_UserUuid(UUID userUuid);

    Optional<Notification> findByUser_UserUuidAndNotificationId(UUID userUuid, Long notificationId);
}
