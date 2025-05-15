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
    private String quizTitle;
    private String userId;
    private Map<String, String> answers; // questionId -> user answer
    private int score;
    private Date completedAt;

    public java.lang.String getId() {
        return id;
    }

    public void setId(java.lang.String id) {
        this.id = id;
    }

    public java.lang.String getQuizId() {
        return quizId;
    }

    public void setQuizId(java.lang.String quizId) {
        this.quizId = quizId;
    }

    public java.lang.String getQuizTitle() {
        return quizTitle;
    }

    public void setQuizTitle(java.lang.String quizTitle) {
        this.quizTitle = quizTitle;
    }

    public java.lang.String getUserId() {
        return userId;
    }

    public void setUserId(java.lang.String userId) {
        this.userId = userId;
    }

    public Map<String,String> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<String,String> answers) {
        this.answers = answers;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public Date getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(Date completedAt) {
        this.completedAt = completedAt;
    }
}
