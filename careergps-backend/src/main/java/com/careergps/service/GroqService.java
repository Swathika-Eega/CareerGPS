package com.careergps.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Service
public class GroqService {

    @Value("${groq.api.key}")
    private String apiKey;

    public String getCareerAdvice(String message) {
    	HttpURLConnection conn = null;

        try {

            String prompt =
                    "You are CareerGPS Assistant. "
                    + "Answer only career, resume, interview, skills, roadmap and job preparation questions. "
                    + "If asked unrelated questions, politely refuse.\n\n"
                    + message;

            URL url = new URL(
                "https://api.groq.com/openai/v1/chat/completions"
            );

            conn =
                    (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");

            conn.setRequestProperty(
                    "Authorization",
                    "Bearer " + apiKey);

            conn.setRequestProperty(
                    "Content-Type",
                    "application/json");

            conn.setDoOutput(true);

            String requestBody =
                    "{"
                    + "\"model\":\"openai/gpt-oss-20b\","
                    + "\"messages\":["
                    + "{"
                    + "\"role\":\"user\","
                    + "\"content\":\""
                    + prompt.replace("\"", "\\\"")
                    .replace("\n", "\\n")
                    .replace("\r", "")
                    + "\""
                    + "}"
                    + "]"
                    + "}";

            OutputStream os =
                    conn.getOutputStream();
            System.out.println(requestBody);

            os.write(requestBody.getBytes());
            os.flush();
            os.close();

            BufferedReader br =
                    new BufferedReader(
                            new InputStreamReader(
                                    conn.getInputStream()));

            StringBuilder response =
                    new StringBuilder();

            String line;

            while ((line = br.readLine()) != null) {
                response.append(line);
            }

            br.close();

            JsonObject json =
                    JsonParser.parseString(
                            response.toString())
                            .getAsJsonObject();

            JsonArray choices =
                    json.getAsJsonArray(
                            "choices");

            return choices.get(0)
                    .getAsJsonObject()
                    .getAsJsonObject("message")
                    .get("content")
                    .getAsString();

        } catch (Exception e) {

            e.printStackTrace();

            try {

                BufferedReader errorReader =
                    new BufferedReader(
                        new InputStreamReader(
                            conn.getErrorStream()));

                String line;
                StringBuilder error =
                    new StringBuilder();

                while ((line =
                    errorReader.readLine()) != null) {

                    error.append(line);
                }

                return error.toString();

            } catch (Exception ex) {

                return "ERROR: " + e.getMessage();
            }
        }
        
    }
    public String generateAIRoadmap(
            String role) {

        return getCareerAdvice(
            "Create a detailed 3-month learning roadmap for becoming a "
            + role
            + ". Format it with Month 1, Month 2 and Month 3 sections and learning tasks."
        );
    }
    public String reviewResume(
            String resumeText) {

        return getCareerAdvice(
            "Review this resume and provide:\n\n"
            + "1. Resume Score out of 100\n"
            + "2. Strengths\n"
            + "3. Weaknesses\n"
            + "4. Suggestions for improvement\n\n"
            + resumeText
        );
    }
}