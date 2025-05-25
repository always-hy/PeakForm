package com.sustech.cs304.project.peakform.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

public record UserAchievementResponse(
        String achievementName,
        LocalDateTime achievedAt
) implements Serializable {
}
