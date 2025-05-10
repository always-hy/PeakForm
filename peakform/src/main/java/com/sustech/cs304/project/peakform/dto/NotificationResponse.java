package com.sustech.cs304.project.peakform.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

public record NotificationResponse(
        Long notificationId,
        String message,
        Boolean isRead,
        LocalDateTime createdAt
) implements Serializable {
}