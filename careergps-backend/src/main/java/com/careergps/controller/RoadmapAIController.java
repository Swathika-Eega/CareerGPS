package com.careergps.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.careergps.service.GroqService;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class RoadmapAIController {

    @Autowired
    private GroqService groqService;

    @GetMapping("/roadmap")
    public String generateRoadmap(
            @RequestParam String role) {

        return groqService
                .generateAIRoadmap(role);
    }
}