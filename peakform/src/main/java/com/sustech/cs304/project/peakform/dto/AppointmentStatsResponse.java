package com.sustech.cs304.project.peakform.dto;

import java.io.Serializable;
import java.util.List;

public record AppointmentStatsResponse(
        Long totalBookings,
        Long completedBookings,
        Long cancelledBookings,
        Long missedBookings,
        List<BookingRecordResponse> bookingRecords
) implements Serializable {
}
