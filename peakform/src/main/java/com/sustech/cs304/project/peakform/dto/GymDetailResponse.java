package com.sustech.cs304.project.peakform.dto;

import java.time.LocalTime;
import java.util.List;

public record GymDetailResponse(
        String gymName,
        LocalTime startTime,
        LocalTime endTime,
        String location,
        String description,
        String contact,
        List<String> gymPhotos,
        List<GymScheduleResponse> gymSessions
) {
}
