// src/pages/BrowseQuizzesPage.tsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

const BrowseQuizzesPage = () => {
  const { quizzes, fetchQuizzes } = useQuiz();

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">
        📚 Browse Public Quizzes
      </h1>

      {quizzes.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No quizzes available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 hover:shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-2">{quiz.title}</h2>
              <p className="text-gray-600 mb-4">{quiz.description}</p>

              <Link
                to={`/quiz/${quiz.id}`}
                className="inline-block px-6 py-2 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Take Quiz
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseQuizzesPage;
