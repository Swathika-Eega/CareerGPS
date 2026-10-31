package com.careergps.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.careergps.entity.ResumeHistory;


public interface ResumeHistoryRepository
        extends JpaRepository<ResumeHistory, Long> {

	List<ResumeHistory>
	findByEmailOrderByAnalyzedAtDesc(
	        String email);
}