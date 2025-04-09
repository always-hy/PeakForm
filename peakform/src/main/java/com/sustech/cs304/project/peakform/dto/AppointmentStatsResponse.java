package com.sustech.cs304.project.peakform.dto;

public record AppointmentStatsResponse(
        Long totalBookings,
        Long completedBookings,
        Long cancelledBookings,
        Long missedBookings
) {
}
