package com.quiz.quizapp.repository;

import com.quiz.quizapp.model.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuizRepository extends MongoRepository<Quiz, String> {
}
