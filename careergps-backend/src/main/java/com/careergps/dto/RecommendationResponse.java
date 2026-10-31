package com.careergps.dto;

import java.util.List;

public class RecommendationResponse {

    private List<String> missingSkills;
    private List<String> recommendedResources;

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills;
    }

    public List<String> getRecommendedResources() {
        return recommendedResources;
    }

    public void setRecommendedResources(List<String> recommendedResources) {
        this.recommendedResources = recommendedResources;
    }
}