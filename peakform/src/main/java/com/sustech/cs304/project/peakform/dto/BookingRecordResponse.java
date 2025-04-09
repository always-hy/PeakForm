package com.sustech.cs304.project.peakform.dto;

import com.sustech.cs304.project.peakform.domain.UserSchedule;

import java.time.LocalDate;
import java.time.LocalTime;

public record BookingRecordResponse(
        Long gymSessionId,
        String gymName,
        LocalDate date,
        LocalTime sessionStart,
        LocalTime sessionEnd,
        UserSchedule.AppointmentStatus appointmentStatus
) {
}
