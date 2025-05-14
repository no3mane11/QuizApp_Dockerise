import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ChevronDown } from 'lucide-react';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setOpen(!open);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 focus:outline-none"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${user?.username}&background=0D8ABC&color=fff&rounded=true`}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <span  className="text-sm font-medium truncate max-w-[100px]">Bienvenue, {user?.username}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
{open && (
  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
    <Link
      to="/dashboard"
      className="block px-4 py-2 hover:bg-gray-100 text-sm"
    >
      Tableau de bord
    </Link>
    <Link
      to="/profile"
      className="block px-4 py-2 hover:bg-gray-100 text-sm"
    >
      Mon profil
    </Link>
    <button
      onClick={logout}
      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
    >
      Déconnexion
    </button>
  </div>
)}
          </div>
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
