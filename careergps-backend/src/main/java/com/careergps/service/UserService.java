package com.careergps.service;

import java.util.List;
import com.careergps.entity.ResumeHistory;
import com.careergps.dto.LoginRequest;
import com.careergps.dto.RegisterRequest;
import org.springframework.web.multipart.MultipartFile;
import com.careergps.dto.SkillResponse;
import com.careergps.dto.GapRequest;
import com.careergps.dto.GapResponse;
import com.careergps.dto.RoadmapResponse;
import com.careergps.dto.RecommendationResponse;


public interface UserService {

    String registerUser(RegisterRequest request);

    String loginUser(LoginRequest request);
    
    String uploadResume(MultipartFile file);
    
    String extractResumeText(String fileName);
    
    SkillResponse extractSkills(String fileName);
    
    GapResponse analyzeGap(GapRequest request);
    
    RoadmapResponse generateRoadmap(String targetRole);
    
    RecommendationResponse getRecommendations(GapRequest request);
    
    void saveResumeHistory(
            String email,
            String fileName,
            String targetRole);
    List<ResumeHistory> getResumeHistory(
            String email);
    
    void deleteHistory(Long id);
}