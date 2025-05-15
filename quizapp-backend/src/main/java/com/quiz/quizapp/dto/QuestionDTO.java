package com.quiz.quizapp.dto;

import java.util.List;

public class QuestionDTO {
    private String questionText;
    private List<String> options;
    private String correctAnswer;

    // Getters & Setters


    public java.lang.String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(java.lang.String questionText) {
        this.questionText = questionText;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public java.lang.String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(java.lang.String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }
}
