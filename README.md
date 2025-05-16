
# 📚 QuizApp 

**QuizApp** est une application web full-stack permettant la création, gestion et participation à des quiz en ligne. Elle est conçue pour deux types d’utilisateurs : les **administrateurs** et les **utilisateurs réguliers**.

---

## 🚀 Fonctionnalités principales

- Authentification sécurisée avec JWT
- Création et gestion de quiz par les administrateurs
- Navigation et tentative de quiz pour les utilisateurs
- Feedback immédiat et résultats
- Tableau de bord analytique
- Interface intuitive avec ReactJS
- APIs REST documentées avec Swagger

---

## ⚙️ Stack Technique

| Côté | Technologie |
|------|-------------|
| Backend | Spring Boot, MongoDB Atlas, JWT |
| Frontend | ReactJS |
| API Docs | Swagger |
| CI/CD | Azure DevOps |
| Conteneurisation | Docker |

---

## 📦 Pré-requis

- [Node.js](https://nodejs.org/) v16+
- [Docker](https://www.docker.com/)
- [Java JDK](https://adoptium.net/) 17
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Maven

---

## 🛠️ Construction & Exécution

### 🔹 1. Cloner le projet

```bash
git clone https://github.com/votre-utilisateur/quizapp.git
cd quizapp
```

### 🔹 2. Backend (Spring Boot)

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

> ⚠️ Assure-toi d’avoir une base MongoDB configurée dans `application.properties`.

### 🔹 3. Frontend (ReactJS)

```bash
cd frontend
npm install
npm run dev
```

Accès : [http://localhost:3000](http://localhost:3000)

---

## 🐳 Exécution via Docker

### 🔹 1. Build et run le backend et frontend

```bash
docker-compose up --build
```

> Les services s'exécuteront sur les ports définis dans le fichier `docker-compose.yml`.

---

## 📘 Documentation API

L’API REST est documentée grâce à **Swagger** :  
[http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---

## 🔐 Sécurité

- Authentification avec **JWT**
- Rôles : `USER` et `ADMIN`
- Accès sécurisé aux routes

---

## 🔧 CI/CD

Le pipeline CI/CD est intégré via **Azure DevOps** pour le build, les tests et le déploiement automatisé.

---

## 📄 Auteurs

- Sami Elhadraoui  
- Haimoudi Nouaman
