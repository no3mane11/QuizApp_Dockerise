# Étape 1 : build dans quizapp-backend/
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /build
COPY quizapp-backend /build
RUN mvn clean package -DskipTests

# Étape 2 : lancer le JAR
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /build/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
