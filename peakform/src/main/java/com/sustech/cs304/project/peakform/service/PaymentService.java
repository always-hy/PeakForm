package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.dto.PaymentRequest;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.alipay.api.AlipayClient;
import com.alipay.api.request.AlipayTradePagePayRequest;
import com.alipay.api.response.AlipayTradePagePayResponse;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final AlipayClient alipayClient;
    private final RestTemplate restTemplate = new RestTemplate();

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

    public ResponseEntity<String> makeAlipayPayment(PaymentRequest request) {
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