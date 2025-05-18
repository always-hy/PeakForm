package com.sustech.cs304.project.peakform.dto;

import java.util.UUID;

public record StripePaymentRequest(
        String paymentMethodId,
        Long amount,
        String currency,
        UUID userUuid
) {}