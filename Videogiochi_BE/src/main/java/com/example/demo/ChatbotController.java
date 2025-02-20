package com.example.demo;

import com.example.demo.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/chatbot")
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;


    @PostMapping("/message")
    public ResponseEntity<Map<String, String>> chatbotResponse(@RequestBody Map<String, Object> request) {
        String userMessage = (String) request.get("message");
        Long userId = Long.valueOf(request.get("userId").toString());


        String risposta = chatbotService.chat(userMessage, userId);

        Map<String, String> response = new HashMap<>();
        response.put("message", risposta);

        return ResponseEntity.ok(response);
    }

}