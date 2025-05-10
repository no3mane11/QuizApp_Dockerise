package com.quiz.quizapp.controller;

import com.quiz.quizapp.model.Quiz;
import com.quiz.quizapp.model.QuizAttempt;
import com.quiz.quizapp.repository.QuizAttemptRepository;
import com.quiz.quizapp.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;
import java.util.List;

@RestController

// ✅ Utilisation de @RequestMapping pour définir le préfixe de l'URL
@RequestMapping("/api/attempts")
@RequiredArgsConstructor
public class AttemptController {

    private final QuizRepository quizRepository;
    private final QuizAttemptRepository attemptRepository;

    @PostMapping("/submit")
    public QuizAttempt submitAttempt(@RequestBody QuizAttempt attempt) {
        Optional<Quiz> optionalQuiz = quizRepository.findById(attempt.getQuizId());

        if (optionalQuiz.isEmpty()) {
            throw new RuntimeException("Quiz not found");
        }

        Quiz quiz = optionalQuiz.get();
        int correctCount = 0;

        for (var question : quiz.getQuestions()) {
            String correctAnswer = question.getCorrectAnswer();
            String userAnswer = attempt.getAnswers().get(question.getId());

            if (correctAnswer != null && userAnswer != null) {
                if ("multiple-choice".equals(question.getType()) || "true-false".equals(question.getType())) {
                    if (correctAnswer.equals(userAnswer)) {
                        correctCount++;
                    }
                } else if ("short-answer".equals(question.getType())) {
                    if (correctAnswer.trim().equalsIgnoreCase(userAnswer.trim())) {
                        correctCount++;
                    }
                }
            }
        }

        int score = (correctCount * 100) / quiz.getQuestions().size();
        attempt.setScore(score);
        attempt.setCompletedAt(new Date());

        return attemptRepository.save(attempt);
    }

    @GetMapping("/user/{userId}")
    public List<QuizAttempt> getUserAttempts(@PathVariable String userId) {
        return attemptRepository.findByUserId(userId);
    }

    @GetMapping("/{id}")
    public Optional<QuizAttempt> getAttemptById(@PathVariable String id) {
        return attemptRepository.findById(id);
    }
}
