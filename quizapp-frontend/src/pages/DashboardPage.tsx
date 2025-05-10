// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useAttempt } from '../context/AttemptContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Quiz } from '../context/QuizContext';
import { QuizAttempt } from '../context/QuizContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts'; // ✅ Ajouter recharts pour le graphique

const DashboardPage = () => {
  const { fetchQuizzes, quizzes } = useQuiz();
  const { user } = useAuth();
  const { fetchUserAttempts, attempts } = useAttempt();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchQuizzes();
      if (user) {
        await fetchUserAttempts(user.id);
      }
      setLoading(false);
    };
    fetchData();
  }, [fetchQuizzes, fetchUserAttempts, user]);

  if (loading) return <div className="text-center p-8">Chargement du tableau de bord...</div>;

  const myQuizzes = quizzes.filter((quiz: Quiz) => quiz.createdBy === user?.id);

  // ✅ Calculer le score cumulé
  const totalScore = attempts.reduce((sum, attempt) => sum + attempt.score, 0);

  // ✅ Préparer les données pour le graphique
  const leaderboardData = attempts.map((attempt) => ({
    name: attempt.quizId.substring(0, 6) + "...", // raccourcir l'id
    score: attempt.score,
  }));

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📋 Votre Dashboard</h1>

      {/* ➡️ Section Score Cumulé */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">🎯 Votre Score Cumulé</h2>
        <p className="text-center text-xl text-green-600 font-bold">
          {totalScore} points
        </p>
      </div>

      {/* ➡️ Graphique de Classement par Quiz */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">📊 Vos Scores par Quiz</h2>
        {leaderboardData.length === 0 ? (
          <p className="text-gray-500 text-center">Pas de tentatives disponibles.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leaderboardData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ➡️ Mes Quiz Créés */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🛠️ Mes Quiz Créés</h2>

        {myQuizzes.length === 0 ? (
          <p className="text-gray-500">Vous n'avez pas encore créé de quiz.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-left">
                  <th className="py-3 px-6">Titre</th>
                  <th className="py-3 px-6">Description</th>
                  <th className="py-3 px-6">Questions</th>
                  <th className="py-3 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myQuizzes.map((quiz: Quiz) => (
                  <tr key={quiz.id} className="border-t hover:bg-gray-50 transition">
                    <td className="py-3 px-6 font-semibold">{quiz.title}</td>
                    <td className="py-3 px-6">{quiz.description}</td>
                    <td className="py-3 px-6">{quiz.questions.length}</td>
                    <td className="py-3 px-6">
                      <Link
                        to={`/quiz/${quiz.id}`}
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      >
                        Voir Quiz
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ➡️ Mes Tentatives */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">📝 Mes Tentatives de Quiz</h2>

        {attempts.length === 0 ? (
          <p className="text-gray-500">Vous n'avez pas encore tenté de quiz.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-left">
                  <th className="py-3 px-6">ID du Quiz</th>
                  <th className="py-3 px-6">Score</th>
                  <th className="py-3 px-6">Date</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((attempt: QuizAttempt) => (
                  <tr key={attempt.id} className="border-t hover:bg-gray-50 transition">
                    <td className="py-3 px-6">{attempt.quizId.substring(0, 10)}...</td>
                    <td className="py-3 px-6">{attempt.score} / 100</td>
                    <td className="py-3 px-6">{new Date(attempt.completedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
