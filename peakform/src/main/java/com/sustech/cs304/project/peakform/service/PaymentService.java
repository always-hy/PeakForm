package com.sustech.cs304.project.peakform.service;

import com.alipay.api.AlipayClient;
import com.alipay.api.request.AlipayTradePagePayRequest;
import com.alipay.api.response.AlipayTradePagePayResponse;
import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.dto.AlipayPaymentRequest;
import com.sustech.cs304.project.peakform.dto.StripePaymentRequest;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import java.util.List;
import java.util.Map;

@Profile("dev")
@Service
@RequiredArgsConstructor
public class PaymentService {
    private final AlipayClient alipayClient;
    private final RestTemplate restTemplate = new RestTemplate();
    private final UserRepository userRepository;

    @Value("${stripe.secret-key}")
    String secretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }

    public String processPayment(StripePaymentRequest request) throws StripeException {
        User user = userRepository.findById(request.userUuid())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Create payment intent
        PaymentIntent paymentIntent = PaymentIntent.create(
                PaymentIntentCreateParams.builder()
                        .setAmount(request.amount())
                        .setCurrency(request.currency())
                        .setPaymentMethod(request.paymentMethodId())
                        .setConfirm(true)
                        .setAutomaticPaymentMethods(
                                PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                        .setEnabled(true)
                                        .build()
                        )
                        .build()
        );

        if ("succeeded".equals(paymentIntent.getStatus())) {
            user.setSubscribed(true);
            userRepository.save(user);
            return paymentIntent.getId();
        } else {
            throw new RuntimeException("Payment failed: " + paymentIntent.getStatus());
        }
    }

    private String getNgrokUrl() {
        try {
            Map<String, Object> response = restTemplate.getForObject("http://localhost:4040/api/tunnels", Map.class);
            List<Map<String, String>> tunnels = (List<Map<String, String>>) response.get("tunnels");
            if (!tunnels.isEmpty()) {
                return tunnels.get(0).get("public_url") + "payment/notify";
            }
        } catch (Exception e) {
            System.err.println("Failed to fetch Ngrok URL: " + e.getMessage());
        }
        return "http://localhost:3000/payment/notify";
    }

    public ResponseEntity<String> makeAlipayPayment(AlipayPaymentRequest request) {
        AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest();
        alipayRequest.setReturnUrl("http://localhost:3000/payment/success");
        alipayRequest.setNotifyUrl(getNgrokUrl());
        alipayRequest.setBizContent("{" +
                "\"out_trade_no\":\"" + request.orderId() + "\"," +
                "\"product_code\":\"FAST_INSTANT_TRADE_PAY\"," +
                "\"total_amount\":" + request.amount() + "," +
                "\"subject\":\"Workout Plan Subscription\"," +
                "\"body\":\"AI Workout Plan for User\"" +
                "}");
        try {
            AlipayTradePagePayResponse response = alipayClient.pageExecute(alipayRequest);
            if (response.isSuccess()) {
                return ResponseEntity.ok(response.getBody());
            } else {
                throw new RuntimeException("Alipay payment initiation failed: " + response.getSubMsg());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error initiating Alipay payment", e);
        }
    }

    public String makeAlipayNotify(Map<String, String> params) {
        if ("TRADE_SUCCESS".equals(params.get("trade_status"))) {
            System.out.println("Payment successful: " + params.get("out_trade_no"));
            // Update payment status in database (e.g., mark user as subscribed)
            // Notify the user via email
            return "success";
        }
        return "failure";
    }
}