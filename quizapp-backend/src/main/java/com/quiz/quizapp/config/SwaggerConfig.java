package com.quiz.quizapp.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@SecurityScheme(
        name = "BearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT"
)
@OpenAPIDefinition(
        info = @Info(
                title = "QuizApp Generator API",
                version = "1.0.0",
                description = "API documentation for QuizApp",
                contact = @Contact(name = "Sami Elhadraoui", email = "contact@quizapp.com")
        )
)
public class SwaggerConfig {

    @Bean
    public OpenAPI quizAppOpenAPI() {
        return new OpenAPI()
                .addSecurityItem(new SecurityRequirement().addList("BearerAuth")) // 🔐 Applique la sécurité
                .components(new Components()
                        .addSecuritySchemes("BearerAuth",
                                new io.swagger.v3.oas.models.security.SecurityScheme()
                                        .type(Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                        )
                );
    }
}
