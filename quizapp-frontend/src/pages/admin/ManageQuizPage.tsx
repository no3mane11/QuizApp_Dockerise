import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllQuizzes , deleteQuizById } from '../../api/quizApi'; // 🧠 adapte les chemins
import { useAuth } from '../../context/AuthContext';
import { Quiz } from '../../context/QuizContext';

const ManageQuizzesPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState('');
  const { user, isAdmin } = useAuth();

  const loadQuizzes = async () => {
    try {
      const data = await getAllQuizzes();
      // Optionnel : filtrer seulement les quiz de l'utilisateur
      const filtered = isAdmin ? data : data.filter((q: Quiz) => q.createdBy === user?.id);
      setQuizzes(filtered);
    } catch (err) {
      setError('Erreur lors du chargement des quiz.');
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Supprimer ce quiz ? Cette action est irréversible.");
    if (!confirmDelete) return;
    try {
      await deleteQuizById(id);
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
    } catch {
      alert("Erreur lors de la suppression du quiz.");
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">📚 Gérer les Quiz</h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {quizzes.length === 0 ? (
        <p className="text-center text-gray-500">Aucun quiz disponible.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-700">
                <th className="p-4">Titre</th>
                <th className="p-4">Description</th>
                <th className="p-4">Nb Questions</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <tr key={quiz.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-semibold">{quiz.title}</td>
                  <td className="p-4">{quiz.description}</td>
                  <td className="p-4">{quiz.questions?.length || 0}</td>
                  <td className="p-4 flex space-x-2">
                    <Link
                      to={`/quiz/${quiz.id}`}
                      className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm"
                    >
                      Voir
                    </Link>
                    <Link
                      to={`/admin/edit-quiz/${quiz.id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleDelete(quiz.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageQuizzesPage;
