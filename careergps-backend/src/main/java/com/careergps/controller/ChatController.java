package com.careergps.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.careergps.dto.ChatRequest;
import com.careergps.dto.ChatResponse;
import com.careergps.service.GroqService;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    @Autowired
    private GroqService groqService;

    @PostMapping
    public ChatResponse chat(
            @RequestBody ChatRequest request) {

        String reply =
                groqService.getCareerAdvice(
                        request.getMessage());

        return new ChatResponse(reply);
    }
}