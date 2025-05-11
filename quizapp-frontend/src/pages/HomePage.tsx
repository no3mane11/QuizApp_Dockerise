// src/pages/HomePage.tsx
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-blue-100 via-white to-white">
      <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-4">
        Welcome to QuizGenius 🎯
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
        Create your own quizzes, challenge your friends, and improve your knowledge while having fun!
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        <Link
          to="/create-quiz"
          className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Create a Quiz
        </Link>

        <Link
          to="/dashboard"
          className="px-8 py-4 bg-gray-200 text-gray-800 text-lg font-semibold rounded-lg hover:bg-gray-300 transition"
        >
          My Dashboard
        </Link>

      </div>

      <div className="mt-16 text-gray-400 text-sm">
        © 2025 QuizGenius. All rights reserved.
      </div>
    </div>
  );
};

export default HomePage;
