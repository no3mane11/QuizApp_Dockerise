package com.quiz.quizapp.model;

import lombok.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Question {
    private String id; // généré côté Java (UUID)
    private String text;
    private String type; // multiple-choice, true-false, short-answer
    private List<String> options;
    private String correctAnswer; // pour éviter Object inutilisable dans Mongo
    private String explanation;
}
