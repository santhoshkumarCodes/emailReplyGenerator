package com.example.backend.Service;

import com.example.backend.Entity.EmailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.Map;

@Service
public class EmailGeneratorService {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final WebClient webClient;

    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String generateEmail(EmailRequest emailRequest) {
        String prompt = buildPrompt(emailRequest);
        Map<String, Object> requestBody = Map.of(
                "contents" , new Object[] {
                        Map.of("parts" , new Object[] {
                            Map.of("text" , prompt)
                        })
                }
        );

        String response = webClient.post().uri(geminiApiUrl + geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return extractResponse(response);
    }

    private String extractResponse(String response) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response);
            return rootNode.path("candidates").get(0)
                    .path("content")
                    .path("parts").get(0)
                    .path("text").asText();

        } catch (Exception e) {
            return "Error while generating email response" + e.getMessage();
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        String tone = "professional";
        if(emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()){
            tone = emailRequest.getTone();
        }
        prompt.append("Generate a ").append(tone).append(" email reply for the following email content. Please do not generate a subject line");
        prompt.append("\nEmail Content: \n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }
}
