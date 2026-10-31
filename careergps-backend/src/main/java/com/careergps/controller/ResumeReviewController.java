package com.careergps.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.careergps.service.GroqService;
import com.careergps.service.UserService;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class ResumeReviewController {

    @Autowired
    private UserService userService;

    @Autowired
    private GroqService groqService;

    @GetMapping("/resume-review")
    public String reviewResume(
            @RequestParam String fileName) {

        try {

            System.out.println(
                "FILE = " + fileName);

            String resumeText =
                    userService.extractResumeText(
                            fileName);

            if (resumeText == null
                    || resumeText.trim().isEmpty()) {

                return "No resume text extracted.";
            }

            System.out.println(
                "TEXT LENGTH = "
                + resumeText.length());

            String result =
                    groqService.reviewResume(
                            resumeText);

            System.out.println(
                "AI REVIEW GENERATED");

            return result;

        } catch (Exception e) {

            e.printStackTrace();

            return "ERROR: "
                    + e.getMessage();
        }
    }
}