package com.quiz.quizapp.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "attempts")
public class QuizAttempt {
    @Id
    private String id;

    private String quizId;
    private String userId;
    private Map<String, String> answers; // questionId -> user answer
    private int score;
    private Date completedAt;
}
