import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import CreateQuizPage from './pages/CreateQuizPage';
import TakeQuizPage from './pages/TakeQuizPage';
import ResultsPage from './pages/ResultsPage';
import NotFoundPage from './pages/NotFoundPage';
import BrowseQuizzesPage from './pages/BrowseQuizzesPage'; // <-- Ajouté ici !!
import { QuizProvider } from './context/QuizContext';
import { AuthProvider } from './context/AuthContext';
import { AttemptProvider } from './context/AttemptContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <QuizProvider>
          <AttemptProvider>
            <div className="flex flex-col min-h-screen bg-gray-50">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/create-quiz" element={<CreateQuizPage />} />
                  <Route path="/quiz/:id" element={<TakeQuizPage />} />
                  <Route path="/results/:id" element={<ResultsPage />} />
                  <Route path="/browse-quizzes" element={<BrowseQuizzesPage />} /> {/* Ajouté ici !! */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </AttemptProvider>
        </QuizProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
