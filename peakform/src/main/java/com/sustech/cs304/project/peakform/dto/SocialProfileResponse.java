package com.sustech.cs304.project.peakform.dto;

import java.io.Serializable;
import java.util.List;

public record SocialProfileResponse(
        UserProfileResponse userProfile,
        List<UserAchievementResponse> achievements
) implements Serializable {
}
