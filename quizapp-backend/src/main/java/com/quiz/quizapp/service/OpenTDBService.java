package com.quiz.quizapp.service;

import com.quiz.quizapp.dto.QuestionDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service
public class OpenTDBService {

    private final RestTemplate restTemplate = new RestTemplate();

    public List<QuestionDTO> fetchQuizQuestions(String category, String difficulty, int amount) {
        String apiUrl = String.format(
                "https://opentdb.com/api.php?amount=%d&category=%s&difficulty=%s&type=multiple",
                amount, category, difficulty
        );

        ResponseEntity<Map> response = restTemplate.getForEntity(apiUrl, Map.class);
        List<Map<String, Object>> results = (List<Map<String, Object>>) response.getBody().get("results");

        List<QuestionDTO> questions = new ArrayList<>();
        for (Map<String, Object> result : results) {
            QuestionDTO question = new QuestionDTO();
            question.setQuestionText((String) result.get("question"));
            List<String> options = new ArrayList<>();
            options.add((String) result.get("correct_answer"));
            options.addAll((List<String>) result.get("incorrect_answers"));
            Collections.shuffle(options);
            question.setOptions(options);
            question.setCorrectAnswer((String) result.get("correct_answer"));
            questions.add(question);
        }

        return questions;
    }
}
