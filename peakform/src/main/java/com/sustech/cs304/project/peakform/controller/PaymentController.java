package com.sustech.cs304.project.peakform.controller;

import com.stripe.exception.StripeException;
import com.sustech.cs304.project.peakform.dto.AlipayPaymentRequest;
import com.sustech.cs304.project.peakform.dto.StripePaymentRequest;
import com.sustech.cs304.project.peakform.service.PaymentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Profile("dev")
@RequiredArgsConstructor
@RestController
@RequestMapping("/payment")
public class PaymentController {
    private final PaymentService paymentService;

    @Transactional
    @PostMapping("/stripe")
    @PreAuthorize("#request.userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> processPayment(@RequestBody StripePaymentRequest request) {
        try {
            String paymentIntentId = paymentService.processPayment(request);
            return ResponseEntity.ok("Payment successful" + paymentIntentId);
        } catch (StripeException e) {
            return ResponseEntity.badRequest()
                    .body("Payment failed: " + e.getMessage());
        }
    }

    @Transactional
    @PostMapping("/alipay")
    @PreAuthorize("#request.userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> initiateAlipayPayment(@RequestBody AlipayPaymentRequest request) {
        return paymentService.makeAlipayPayment(request);
    }

    @Transactional
    @PostMapping("/notify")
    // Server to server notification
    public String handleAlipayNotify(@RequestParam Map<String, String> params) throws Exception {
        return paymentService.makeAlipayNotify(params);
    }
}
