import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { useAttempt } from '../context/AttemptContext';
import SidebarLayout from '../pages/SidebarLayout';
import { Link } from 'react-router-dom';
import { updateCurrentUser } from '../api/userApi';

const ProfilePage = () => {
  const { user, setUser, logout } = useAuth();
  const { quizzes } = useQuiz();
  const { attempts, fetchUserAttempts } = useAttempt();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    if (user) {
      fetchUserAttempts(user.id);
      setFormData({ username: user.username, email: user.email });
    }
  }, [user, fetchUserAttempts]);

  useEffect(() => {
    if (attempts.length > 0) {
      const total = attempts.reduce((sum, a) => sum + a.score, 0);
      setAverageScore(Math.round(total / attempts.length));
    }
  }, [attempts]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedUser = await updateCurrentUser(formData);
      setUser(updatedUser); // 🔁 mettre à jour le contexte
      localStorage.setItem('user', JSON.stringify(updatedUser)); // 🗃️ persister dans le localStorage
      setFormData({ username: updatedUser.username, email: updatedUser.email }); // 🆕 refléter l'état réel
      setEditMode(false);
      alert('Profil mis à jour avec succès.');
    } catch (error) {
      alert("Erreur lors de la mise à jour du profil.");
    }
  };

  return (
    <SidebarLayout>
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <img
            src={`https://ui-avatars.com/api/?name=${formData.username}&background=0D8ABC&color=fff&rounded=true`}
            alt="avatar"
            className="w-16 h-16 rounded-full"
          />
          <div className="flex-1">
            {editMode ? (
              <>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 text-sm w-full mb-1"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 text-sm w-full"
                />
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold">{formData.username}</h1>
                <p className="text-sm text-gray-600">{formData.email}</p>
              </>
            )}
          </div>

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded text-sm"
            >
              Modifier
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                Enregistrer
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setFormData({ username: user.username, email: user.email });
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm"
              >
                Annuler
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-semibold text-blue-600 mb-1">Quiz créés</h2>
            <p>{quizzes.filter((q) => q.createdBy === user?.id).length}</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-semibold text-blue-600 mb-1">Tentatives</h2>
            <p>{attempts.length}</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-semibold text-blue-600 mb-1">Score moyen</h2>
            <p>{averageScore} / 100</p>
          </div>
          {attempts.length > 0 && (
            <div className="bg-white rounded shadow p-4">
              <h2 className="font-semibold text-blue-600 mb-1">Dernier quiz</h2>
              <Link
                to={`/results/${attempts[0].id}`}
                className="text-blue-500 hover:underline"
              >
                Voir les résultats
              </Link>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default ProfilePage;
