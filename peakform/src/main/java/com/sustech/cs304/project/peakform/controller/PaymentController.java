package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.dto.PaymentRequest;
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
    @PostMapping("/alipay")
    @PreAuthorize("#request.userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> initiateAlipayPayment(@RequestBody PaymentRequest request) {
        return paymentService.makeAlipayPayment(request);
    }

    @Transactional
    @PostMapping("/notify")
    // Server to server notification
    public String handleAlipayNotify(@RequestParam Map<String, String> params) throws Exception {
        return paymentService.makeAlipayNotify(params);
    }
}
