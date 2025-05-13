package com.quiz.quizapp.repository;

import com.quiz.quizapp.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, String> {
}
