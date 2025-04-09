package com.sustech.cs304.project.peakform.dto;

import com.sustech.cs304.project.peakform.domain.UserSchedule;

import java.time.LocalDate;
import java.time.LocalTime;

public record GymScheduleResponse(
        Long sessionId,
        LocalDate date,
        LocalTime sessionStart,
        LocalTime sessionEnd,
        Integer availableSlots,
        UserSchedule.AppointmentStatus appointmentStatus
) {
}
