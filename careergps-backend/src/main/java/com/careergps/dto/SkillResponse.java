package com.careergps.dto;

import java.util.List;

public class SkillResponse {

    private List<String> skills;

    public SkillResponse() {
    }

    public SkillResponse(List<String> skills) {
        this.skills = skills;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }
}