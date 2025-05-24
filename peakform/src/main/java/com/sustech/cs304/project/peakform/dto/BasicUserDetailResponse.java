package com.sustech.cs304.project.peakform.dto;

import java.io.Serializable;

public record BasicUserDetailResponse(
        String username,
        String email,
        String profilePictureUrl
) implements Serializable {
}
