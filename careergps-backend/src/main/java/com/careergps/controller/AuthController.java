package com.careergps.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import com.careergps.entity.ResumeHistory;
import com.careergps.dto.LoginRequest;
import com.careergps.dto.RegisterRequest;
import com.careergps.service.UserService;
import com.careergps.dto.SkillResponse;
import com.careergps.dto.GapRequest;
import com.careergps.dto.GapResponse;
import com.careergps.dto.RoadmapResponse;
import com.careergps.dto.RecommendationResponse;
import com.careergps.dto.HistoryRequest;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @GetMapping("/hello")
    public String hello() {
        return "CareerGPS Backend Running Successfully!";
    }

    @PostMapping("/register")
    public String registerUser(
            @RequestBody RegisterRequest request) {

        return userService.registerUser(request);
    }

    @PostMapping("/login")
    public String loginUser(
            @RequestBody LoginRequest request) {

        return userService.loginUser(request);
    }

    @PostMapping("/upload-resume")
    public String uploadResume(
            @RequestParam("file") MultipartFile file) {

        return userService.uploadResume(file);
    }

    @GetMapping("/resume-text")
    public String getResumeText(
            @RequestParam String fileName) {

        return userService.extractResumeText(fileName);
    }
    @GetMapping("/skills")
    public SkillResponse getSkills(
            @RequestParam String fileName) {

        return userService.extractSkills(fileName);
    }
    @PostMapping("/gap-analysis")
    public GapResponse analyzeGap(
            @RequestBody GapRequest request) {

        return userService.analyzeGap(request);
    }
    @PostMapping("/roadmap")
    public RoadmapResponse roadmap(
            @RequestParam String targetRole) {

        return userService.generateRoadmap(targetRole);
    }
    @PostMapping("/recommendations")
    public RecommendationResponse recommendations(
            @RequestBody GapRequest request) {

        return userService.getRecommendations(request);
    }
    @PostMapping("/save-history")
    public String saveHistory(
            @RequestBody HistoryRequest request) {

        userService.saveResumeHistory(
                request.getEmail(),
                request.getFileName(),
                request.getTargetRole());

        return "History Saved";
    }
    @GetMapping("/history")
    public List<ResumeHistory> getHistory(
            @RequestParam String email) {

        return userService
                .getResumeHistory(email);
    }
    @DeleteMapping("/history/{id}")
    public String deleteHistory(
            @PathVariable Long id) {

        userService.deleteHistory(id);

        return "History Deleted";
    }
}