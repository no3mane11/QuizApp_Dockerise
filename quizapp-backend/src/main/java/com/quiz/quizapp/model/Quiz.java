package com.quiz.quizapp.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "quizzes")
public class Quiz {
    @Id
    private String id;

    private String title;
    private String description;
    private List<Question> questions;

    private String createdBy; // userId
    private Date createdAt;
}
