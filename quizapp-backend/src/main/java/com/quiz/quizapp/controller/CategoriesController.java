package com.quiz.quizapp.controller;

import com.quiz.quizapp.model.Category;
import com.quiz.quizapp.model.Quiz;
import com.quiz.quizapp.repository.CategoryRepository;
import com.quiz.quizapp.repository.QuizRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import java.util.List;
import java.util.Optional;

@SecurityRequirement(name = "BearerAuth")
@RestController
@RequestMapping("/api/categories")

public class CategoriesController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private QuizRepository quizRepository;

    // ✅ GET /api/categories
    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // ✅ POST /api/categories
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

    // ✅ GET /api/categories/{id}/quizzes
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}/quizzes")
    public List<Quiz> getQuizzesByCategory(@PathVariable String id) {
        return quizRepository.findAll().stream()
                .filter(quiz -> quiz.getCategory() != null && quiz.getCategory().equals(id))
                .toList();
    }
}
