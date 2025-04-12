package com.sustech.cs304.project.peakform.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

public record AppointmentNotification(@JsonProperty("userEmail") String userEmail,
                                      @JsonProperty("appointmentTime") LocalDateTime appointmentTime) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    public AppointmentNotification(String userEmail, LocalDateTime appointmentTime) {
        this.userEmail = userEmail;
        this.appointmentTime = appointmentTime;
    }
}