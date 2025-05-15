# Étape 1 : Build dans le bon sous-dossier
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY quizapp-backend /app
RUN mvn clean package -DskipTests

# Étape 2 : Run jar
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]