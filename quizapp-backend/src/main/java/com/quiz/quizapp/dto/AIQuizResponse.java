package com.quiz.quizapp.dto;

import java.util.List;

public class AIQuizResponse {
    private String title;
    private List<QuestionDTO> questions;

    // Getters & Setters


    public java.lang.String getTitle() {
        return title;
    }

    public void setTitle(java.lang.String title) {
        this.title = title;
    }

    public List<QuestionDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionDTO> questions) {
        this.questions = questions;
    }
}
