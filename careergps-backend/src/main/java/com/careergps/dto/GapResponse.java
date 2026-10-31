package com.careergps.dto;

import java.util.List;

public class GapResponse {

    private String targetRole;
    private List<String> haveSkills;
    private List<String> missingSkills;

    public String getTargetRole() {
        return targetRole;
    }

    public void setTargetRole(String targetRole) {
        this.targetRole = targetRole;
    }

    public List<String> getHaveSkills() {
        return haveSkills;
    }

    public void setHaveSkills(List<String> haveSkills) {
        this.haveSkills = haveSkills;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills;
    }
}