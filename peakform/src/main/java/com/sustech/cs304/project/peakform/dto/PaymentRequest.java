package com.sustech.cs304.project.peakform.dto;

import java.util.UUID;

public record PaymentRequest (
        String orderId,
        UUID userUuid,
        double amount
){}
