package com.careergps.service.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.careergps.dto.GapRequest;
import com.careergps.dto.GapResponse;
import com.careergps.dto.LoginRequest;
import com.careergps.dto.RegisterRequest;
import com.careergps.dto.SkillResponse;
import com.careergps.entity.User;
import com.careergps.repository.UserRepository;
import com.careergps.service.UserService;
import com.careergps.dto.RoadmapResponse;
import com.careergps.dto.RecommendationResponse;
import com.careergps.repository.ResumeHistoryRepository;
import com.careergps.entity.ResumeHistory;

@Service
public class UserServiceImpl implements UserService {
	private BCryptPasswordEncoder encoder =
	        new BCryptPasswordEncoder();

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ResumeHistoryRepository
            resumeHistoryRepository;

    @Override
    public String registerUser(RegisterRequest request) {

        User existingUser =
                userRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if (existingUser != null) {

            return "Email Already Registered";
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(
                encoder.encode(
                        request.getPassword()));

        userRepository.save(user);

        return "User Registered Successfully";
    }

    @Override
    public String loginUser(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return "User Not Found";
        }

        if (encoder.matches(
                request.getPassword(),
                user.getPassword()))
        {
            return "Login Successful";
        }

        return "Invalid Password";
    }

    @Override
    public String uploadResume(MultipartFile file) {

        try {

            File tempFolder = new File("C:/temp");

            if (!tempFolder.exists()) {
                tempFolder.mkdirs();
            }

            String filePath =
                    "C:/temp/" + file.getOriginalFilename();

            System.out.println("Saving file to: " + filePath);

            file.transferTo(new File(filePath));

            return "Resume Uploaded Successfully";

        } catch (Exception e) {

            e.printStackTrace();

            return "Upload Failed";
        }
    }

    @Override
    public String extractResumeText(String fileName) {

        try {

            String path = "C:/temp/" + fileName;

            System.out.println("================================");
            System.out.println("Trying to read file:");
            System.out.println(path);

            File file = new File(path);

            System.out.println("File exists: " + file.exists());

            if (!file.exists()) {
                return "File Not Found";
            }

            PDDocument document =
                    Loader.loadPDF(file);

            PDFTextStripper stripper =
                    new PDFTextStripper();

            String text =
                    stripper.getText(document);

            document.close();

            System.out.println("Resume text extracted successfully!");

            return text;

        } catch (Exception e) {

            System.out.println("ERROR READING PDF");
            e.printStackTrace();

            return "Unable To Read Resume";
        }
    }

    @Override
    public SkillResponse extractSkills(String fileName) {

        String text = extractResumeText(fileName);

        System.out.println("========== RESUME TEXT ==========");
        System.out.println(text);
        System.out.println("=================================");

        List<String> foundSkills =
                new ArrayList<>();

        String[] skillsDatabase = {

        	    "Java",
        	    "Python",
        	    "C",
        	    "C++",

        	    "HTML",
        	    "CSS",
        	    "JavaScript",
        	    "React",

        	    "Spring",
        	    "Spring Boot",
        	    "Hibernate",

        	    "SQL",
        	    "MySQL",
        	    "PostgreSQL",
        	    "MongoDB",

        	    "Git",
        	    "GitHub",

        	    "Docker",
        	    "AWS",

        	    "REST API",

        	    "R",
        	    "VS Code",
        	    "Canva",
        	    "Figma",
        	    
        	    "Excel",
        	    "Power BI",
        	    "Tableau",
        	    "Statistics",
        	    "Machine Learning",
        	    "Deep Learning",
        	    "Pandas",
        	    "NumPy"
        	};

        for (String skill : skillsDatabase) {

            if (text != null &&
                text.toLowerCase().contains(
                        skill.toLowerCase())) {

                System.out.println(
                        "FOUND SKILL: " + skill);

                foundSkills.add(skill);
            }
        }

        return new SkillResponse(foundSkills);
    }

    @Override
    public GapResponse analyzeGap(GapRequest request) {

        SkillResponse skillResponse =
                extractSkills(request.getFileName());

        List<String> userSkills =
                skillResponse.getSkills();

        List<String> requiredSkills =
                new ArrayList<>();

        if (request.getTargetRole().equalsIgnoreCase("Java Developer")) {

            requiredSkills = Arrays.asList(
                    "Java",
                    "Spring Boot",
                    "MySQL",
                    "Git",
                    "HTML",
                    "CSS"
            );
        }
        else if (request.getTargetRole().equalsIgnoreCase("Full Stack Developer")) {

            requiredSkills = Arrays.asList(
                    "Java",
                    "Spring Boot",
                    "MySQL",
                    "React",
                    "JavaScript",
                    "HTML",
                    "CSS",
                    "Git"
            );
        }
        else if (request.getTargetRole().equalsIgnoreCase("Data Analyst")) {

            requiredSkills = Arrays.asList(
                    "Python",
                    "SQL",
                    "Excel",
                    "Power BI",
                    "Tableau",
                    "Statistics"
            );
        }
        else if (request.getTargetRole().equalsIgnoreCase("Data Scientist")) {

            requiredSkills = Arrays.asList(
                    "Python",
                    "SQL",
                    "Machine Learning",
                    "Deep Learning",
                    "Statistics",
                    "Pandas",
                    "NumPy"
            );
        }

        List<String> missingSkills =
                new ArrayList<>();

        for (String skill : requiredSkills) {

            if (!userSkills.contains(skill)) {
                missingSkills.add(skill);
            }
        }

        GapResponse response =
                new GapResponse();

        response.setTargetRole(
                request.getTargetRole());

        response.setHaveSkills(
                userSkills);

        response.setMissingSkills(
                missingSkills);

        return response;
    }
    @Override
    public RoadmapResponse generateRoadmap(String targetRole) {

        RoadmapResponse response =
                new RoadmapResponse();

        response.setTargetRole(targetRole);

        List<String> roadmap =
                new ArrayList<>();

        if (targetRole.equalsIgnoreCase("Java Developer")) {

            roadmap = Arrays.asList(
                    "Learn Core Java",
                    "Learn OOP Concepts",
                    "Learn SQL & MySQL",
                    "Learn Spring Boot",
                    "Build CRUD Project",
                    "Learn Git & GitHub",
                    "Deploy Project"
            );
        }
        else if (targetRole.equalsIgnoreCase("Full Stack Developer")) {

            roadmap = Arrays.asList(
                    "Learn HTML & CSS",
                    "Learn JavaScript",
                    "Learn React",
                    "Learn Java",
                    "Learn Spring Boot",
                    "Learn MySQL",
                    "Build Full Stack Project",
                    "Deploy Project"
            );
        }
        else if (targetRole.equalsIgnoreCase("Data Analyst")) {

            roadmap = Arrays.asList(
                    "Learn Excel",
                    "Learn SQL",
                    "Learn Python Basics",
                    "Learn Data Cleaning",
                    "Learn Power BI",
                    "Learn Tableau",
                    "Build Analytics Dashboard",
                    "Create Portfolio Project"
            );
        }
        else if (targetRole.equalsIgnoreCase("Data Scientist")) {

            roadmap = Arrays.asList(
                    "Learn Python",
                    "Learn NumPy",
                    "Learn Pandas",
                    "Learn Statistics",
                    "Learn Machine Learning",
                    "Learn Deep Learning",
                    "Build ML Projects",
                    "Deploy ML Model"
            );
        }

        response.setRoadmap(roadmap);

        return response;
    }
    @Override
    public RecommendationResponse getRecommendations(GapRequest request) {

        GapResponse gapResponse =
                analyzeGap(request);

        List<String> recommendations =
                new ArrayList<>();

        for (String skill : gapResponse.getMissingSkills()) {

            switch (skill) {

                case "Java":
                    recommendations.add(
                            "Java Programming Masterclass");
                    break;

                case "Spring Boot":
                    recommendations.add(
                            "Spring Boot Beginner Course");
                    break;

                case "MySQL":
                    recommendations.add(
                            "MySQL for Beginners");
                    break;

                case "Git":
                    recommendations.add(
                            "Git & GitHub Crash Course");
                    break;

                case "HTML":
                    recommendations.add(
                            "HTML & CSS Fundamentals");
                    break;

                case "CSS":
                    recommendations.add(
                            "Responsive Web Design Course");
                    break;

                default:
                    recommendations.add(
                            "Learn " + skill);
            }
        }

        RecommendationResponse response =
                new RecommendationResponse();

        response.setMissingSkills(
                gapResponse.getMissingSkills());

        response.setRecommendedResources(
                recommendations);

        return response;
    }
    @Override
    public void saveResumeHistory(
            String email,
            String fileName,
            String targetRole) {

        ResumeHistory history =
                new ResumeHistory();

        history.setEmail(email);
        history.setFileName(fileName);
        history.setTargetRole(targetRole);

        history.setAnalyzedAt(
                java.time.LocalDateTime.now());
        resumeHistoryRepository.save(history);
    }
    @Override
    public List<ResumeHistory> getResumeHistory(
            String email) {

    	return resumeHistoryRepository
    	        .findByEmailOrderByAnalyzedAtDesc(email);
    }
    
    @Override
    public void deleteHistory(Long id) {

        resumeHistoryRepository.deleteById(id);

    }
}