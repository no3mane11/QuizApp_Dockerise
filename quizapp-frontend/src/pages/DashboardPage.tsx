import React, { useEffect, useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useAttempt } from '../context/AttemptContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

const DashboardPage = () => {
  const { fetchQuizzes, quizzes } = useQuiz();
  const { user, isAdmin } = useAuth();
  const { fetchUserAttempts, attempts } = useAttempt();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchQuizzes();
      if (user) await fetchUserAttempts(user.id);
      setLoading(false);
    };
    fetchData();
  }, [fetchQuizzes, fetchUserAttempts, user]);

  const myQuizzes = quizzes.filter((quiz) => quiz.createdBy === user?.id);
  const totalScore = attempts.reduce((sum, a) => sum + a.score, 0);
  const leaderboardData = attempts.map((a) => ({
    name: a.quizId.substring(0, 6) + "...",
    score: a.score,
  }));

  if (loading) return <div className="text-center py-20 text-xl text-gray-500">Chargement du tableau de bord...</div>;

  return (
    
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">📊 Tableau de bord de {user?.username}</h1>

      {isAdmin && (
        <section className="bg-yellow-100 border border-yellow-300 rounded-xl p-6 mb-10 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">🛡️ Espace Administrateur</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/admin/create-category" className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition">
              ➕ Créer une Catégorie
            </Link>
            <Link to="/admin/manage-users" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
              👥 Gérer les Utilisateurs
            </Link>
            <Link to="/admin/manage-quizzes" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
              👥 Gérer les Quizzes
            </Link>
          </div>
        </section>
      )}

      <section className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-semibold mb-2">⭐ Score Total</h2>
          <p className="text-4xl font-bold text-green-600">{totalScore} pts</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">📈 Performance par Quiz</h2>
          {leaderboardData.length === 0 ? (
            <p className="text-gray-500 text-center">Aucune tentative enregistrée.</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={leaderboardData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">📚 Mes Quiz Créés</h2>
        {myQuizzes.length === 0 ? (
          <p className="text-gray-500">Aucun quiz créé.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-4">Titre</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Questions</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myQuizzes.map((quiz) => (
                  <tr key={quiz.id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium">{quiz.title}</td>
                    <td className="p-4">{quiz.description}</td>
                    <td className="p-4">{quiz.questions.length}</td>
                    <td className="p-4 space-x-2">
                      <Link to={`/quiz/${quiz.id}`} className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition">
                        Voir
                      </Link>
                      {isAdmin && (
                        <button
                          onClick={() => alert(`Confirmer suppression quiz ID: ${quiz.id}`)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                        >
                          Supprimer
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">📝 Mes Tentatives</h2>
        {attempts.length === 0 ? (
          <p className="text-gray-500">Aucune tentative disponible.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-4">Quiz</th>
                  <th className="p-4">Score</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((attempt) => (
                  <tr key={attempt.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{attempt.quizId.substring(0, 10)}...</td>
                    <td className="p-4">{attempt.score} / 100</td>
                    <td className="p-4">{new Date(attempt.completedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
 
  );
};

export default DashboardPage;
