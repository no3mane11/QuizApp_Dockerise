package com.quiz.quizapp.dto;

public class AIQuizRequest {
    private String topic;
    private String category;
    private int numQuestions;
    private String difficulty;

    // Getters & Setters


    public java.lang.String getCategory() {
        return category;
    }

    public void setCategory(java.lang.String category) {
        this.category = category;
    }

    public java.lang.String getTopic() {
        return topic;
    }

    public void setTopic(java.lang.String topic) {
        this.topic = topic;
    }

    public int getNumQuestions() {
        return numQuestions;
    }

    public void setNumQuestions(int numQuestions) {
        this.numQuestions = numQuestions;
    }

    public java.lang.String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(java.lang.String difficulty) {
        this.difficulty = difficulty;
    }
}
