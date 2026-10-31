package com.careergps.dto;

import java.util.List;

public class RoadmapResponse {

    private String targetRole;
    private List<String> roadmap;

    public String getTargetRole() {
        return targetRole;
    }

    public void setTargetRole(String targetRole) {
        this.targetRole = targetRole;
    }

    public List<String> getRoadmap() {
        return roadmap;
    }

    public void setRoadmap(List<String> roadmap) {
        this.roadmap = roadmap;
    }
}