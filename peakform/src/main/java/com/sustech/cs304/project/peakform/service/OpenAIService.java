package com.sustech.cs304.project.peakform.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class OpenAIService {

    private final RestTemplate restTemplate;

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url:https://api.openai.com/v1/chat/completions}")
    private String apiUrl;

    public String getOpenAIResponse(String prompt) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + apiKey);
            headers.set("Content-Type", "application/json");

            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode requestBody = objectMapper.createObjectNode();
            requestBody.put("model", "gpt-4o");
            ArrayNode messages = requestBody.putArray("messages");
            ObjectNode message = messages.addObject();
            message.put("role", "user");
            message.put("content", prompt);
            requestBody.put("max_tokens", 1000);

            String jsonRequestBody = objectMapper.writeValueAsString(requestBody);

            HttpEntity<String> entity = new HttpEntity<>(jsonRequestBody, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    apiUrl,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                JsonNode jsonNode = objectMapper.readTree(response.getBody());
                return jsonNode.path("choices").get(0).path("message").path("content").asText();
            } else {
                throw new RuntimeException("OpenAI API returned non-200 status: " + response.getStatusCode());
            }
        } catch (Exception e) {
            System.err.println("Error calling OpenAI API: " + e.getMessage());
            throw new RuntimeException("Failed to get response from OpenAI API", e);
        }
    }
}