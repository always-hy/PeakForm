package com.sustech.cs304.project.peakform.dto;

import java.util.UUID;

public record AlipayPaymentRequest(
        String orderId,
        UUID userUuid,
        Double amount
) {
}
