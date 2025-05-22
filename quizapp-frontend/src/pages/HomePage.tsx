// src/pages/HomePage.tsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SidebarLayout from "../pages/SidebarLayout";

const HomePage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <SidebarLayout>
      <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-blue-100 via-white to-white">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-4">
          Welcome to QuizGenius 🎯
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
          Create your own quizzes, challenge your friends, and improve your knowledge while having fun!
        </p>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="mb-6 text-right relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="px-8 py-4 bg-green-200 text-gray-800 text-lg font-semibold rounded-lg hover:bg-gray-300 transition flex items-center"
            >
              ➕ Créer un quiz
              <svg 
                className={`ml-2 w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200">
                <Link
                  to="/generate-quiz"
                  className="block px-4 py-3 text-left text-gray-800 hover:bg-green-100 rounded-t-lg"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Avec l'aide de l'AI
                </Link>
                <Link
                  to="/create-quiz"
                  className="block px-4 py-3 text-left text-gray-800 hover:bg-green-100 rounded-b-lg"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Création manuelle
                </Link>
              </div>
            )}
          </div>
          
          <div className="mb-6 text-right">
            <Link
              to="/dashboard"
              className="px-8 py-4 bg-gray-200 text-gray-800 text-lg font-semibold rounded-lg hover:bg-gray-300 transition"
            >
              My Dashboard
            </Link>
          </div>
        </div>
        
        <div className="mt-16 text-gray-400 text-sm">
          © 2025 QuizGenius. All rights reserved.
        </div>
      </div>
    </SidebarLayout>
  );
};

export default HomePage;