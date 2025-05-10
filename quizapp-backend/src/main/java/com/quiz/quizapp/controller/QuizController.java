package com.quiz.quizapp.controller;

import com.quiz.quizapp.model.Quiz;
import com.quiz.quizapp.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin(origins = "http://localhost:3000") // adapte si nécessaire
public class QuizController {

    @Autowired
    private QuizRepository quizRepository;

    // ✅ Créer un nouveau quiz
    @PostMapping
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        return quizRepository.save(quiz);
    }

    // ✅ Obtenir TOUS les quizzes (avec champ "id")
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
            return map;
        }).collect(Collectors.toList());
    }

    // ✅ Obtenir un quiz par ID (optionnel : même format)
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
            return map;
        });
    }
}
