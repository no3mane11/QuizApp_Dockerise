package com.quiz.quizapp.repository;

import com.quiz.quizapp.model.QuizAttempt;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuizAttemptRepository extends MongoRepository<QuizAttempt, String> {
    List<QuizAttempt> findByUserId(String userId);
}
