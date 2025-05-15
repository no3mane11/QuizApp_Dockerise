package com.quiz.quizapp.controller;

import java.util.*;
import java.util.stream.Collectors;

import com.quiz.quizapp.model.Quiz;
import com.quiz.quizapp.model.Category;
import com.quiz.quizapp.repository.QuizRepository;
import com.quiz.quizapp.repository.CategoryRepository;
import com.quiz.quizapp.dto.AIQuizRequest;
import com.quiz.quizapp.dto.AIQuizResponse;
import com.quiz.quizapp.dto.QuestionDTO;
import com.quiz.quizapp.service.OpenTDBService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("isAuthenticated()")
@SecurityRequirement(name = "BearerAuth")
@RestController
@RequestMapping("/api/quizzes")

public class QuizController {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private OpenTDBService openTDBService;

    @PostMapping("/ai-generate")
    public AIQuizResponse generateAIQuiz(@RequestBody AIQuizRequest request) {
        List<QuestionDTO> questions = openTDBService.fetchQuizQuestions(
                request.getCategory(), request.getDifficulty(), request.getNumQuestions()
        );
        AIQuizResponse response = new AIQuizResponse();
        response.setTitle(request.getTopic() + " Quiz");
        response.setQuestions(questions);
        return response;
    }

    // ✅ Créer un nouveau quiz
    @PostMapping
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        return quizRepository.save(quiz);
    }

    // ✅ Obtenir TOUS les quizzes (avec champ "id" et nom de la catégorie)
    @GetMapping
    public List<Map<String, Object>> getAllQuizzes() {
        return quizRepository.findAll().stream().map(quiz -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", quiz.getId());
            map.put("title", quiz.getTitle());
            map.put("description", quiz.getDescription());
            map.put("questions", quiz.getQuestions());
            map.put("createdBy", quiz.getCreatedBy());
            map.put("createdAt", quiz.getCreatedAt());
            map.put("categoryId", quiz.getCategory());

            // 🔍 Ajout : récupérer le nom de la catégorie
            if (quiz.getCategory() != null) {
                Optional<Category> category = categoryRepository.findById(quiz.getCategory());
                category.ifPresent(value -> map.put("categoryName", value.getName()));
            }

            return map;
        }).collect(Collectors.toList());
    }

    // ✅ Obtenir un quiz par ID (avec nom de catégorie)
    @GetMapping("/{id}")
    public Optional<Map<String, Object>> getQuizById(@PathVariable String id) {
        return quizRepository.findById(id).map(quiz -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", quiz.getId());
            map.put("title", quiz.getTitle());
            map.put("description", quiz.getDescription());
            map.put("questions", quiz.getQuestions());
            map.put("createdBy", quiz.getCreatedBy());
            map.put("createdAt", quiz.getCreatedAt());
            map.put("categoryId", quiz.getCategory());

            if (quiz.getCategory() != null) {
                Optional<Category> category = categoryRepository.findById(quiz.getCategory());
                category.ifPresent(value -> map.put("categoryName", value.getName()));
            }

            return map;
        });
    }

    @PutMapping("/{id}")
    public Quiz updateQuiz(@PathVariable String id, @RequestBody Quiz updatedQuiz) {
        return quizRepository.findById(id).map(quiz -> {
            quiz.setTitle(updatedQuiz.getTitle());
            quiz.setDescription(updatedQuiz.getDescription());
            quiz.setQuestions(updatedQuiz.getQuestions());
            quiz.setCreatedBy(updatedQuiz.getCreatedBy());
            quiz.setCreatedAt(updatedQuiz.getCreatedAt());
            quiz.setCategory(updatedQuiz.getCategory()); // 🔁 important
            return quizRepository.save(quiz);
        }).orElseThrow(() -> new RuntimeException("Quiz not found with id: " + id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteQuiz(@PathVariable String id) {
        if (!quizRepository.existsById(id)) {
            throw new RuntimeException("Quiz not found with id: " + id);
        }
        quizRepository.deleteById(id);
        return "Quiz deleted successfully with id: " + id;
    }
}
