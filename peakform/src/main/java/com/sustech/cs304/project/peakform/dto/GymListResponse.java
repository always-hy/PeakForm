package com.sustech.cs304.project.peakform.dto;

import java.io.Serializable;
import java.time.LocalTime;

public record GymListResponse(
        Long gymId,
        String gymName,
        LocalTime startTime,
        LocalTime endTime,
        String location,
        String description,
        String contact,
        String gymCoverPhoto
) implements Serializable {
}
