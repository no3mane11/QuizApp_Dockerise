import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        QuizApp
      </Link>
      
      <nav className="flex items-center gap-6">
        <Link to="/browse-quizzes" className="hover:underline text-sm">
          Browse Quizzes
        </Link>

        {isAuthenticated ? (
          <>
            <span className="text-sm">Bienvenue, <strong>{user?.name}</strong></span>
            <Link to="/dashboard" className="hover:underline text-sm">
              Tableau de bord
            </Link>
            <button
              onClick={logout}
              className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-gray-100"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-100"
          >
            Connexion
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
