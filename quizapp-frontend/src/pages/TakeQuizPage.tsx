// src/pages/TakeQuizPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { createAttemptApi } from '../api/attemptApi';

const TakeQuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchQuizById, currentQuiz } = useQuiz();
  const { user } = useAuth();

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        await fetchQuizById(id);
        setLoading(false);
      }
    };
    fetch();
  }, [id, fetchQuizById]);

  const handleOptionChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setError(null); // Clear error when user answers
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuiz || !user) return;

    // Vérifier que toutes les questions ont une réponse
    for (const question of currentQuiz.questions) {
      if (!answers[question.id!] || (typeof answers[question.id!] === 'string' && answers[question.id!].trim() === '')) {
        setError("Merci de répondre à toutes les questions avant de soumettre.");
        return;
      }
    }

    // Calcul du score
    let score = 0;
    currentQuiz.questions.forEach((question) => {
      const userAnswer = answers[question.id!];
      const correctAnswer = question.correctAnswer;

      if (question.type === 'short-answer') {
        if (
          typeof userAnswer === 'string' &&
          typeof correctAnswer === 'string' &&
          userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
        ) {
          score++;
        }
      } else if (question.type === 'multiple-choice' || question.type === 'true-false') {
        if (userAnswer === correctAnswer) {
          score++;
        }
      }
    });

    try {
      const attempt = await createAttemptApi({
        quizId: currentQuiz.id,
        userId: user.id,
        answers,
        score: Math.round((score / currentQuiz.questions.length) * 100), // Score sur 100
      });

      navigate(`/results/${attempt.id}`);
    } catch (error) {
      console.error('Error submitting attempt:', error);
    }
  };

  if (loading || !currentQuiz) return <div className="text-center p-8">Chargement du quiz...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">{currentQuiz.title}</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentQuiz.questions.map((question, index) => (
          <div key={question.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">{index + 1}. {question.text}</h2>

            {question.type === 'multiple-choice' && question.options?.map((option) => (
              <div key={option}>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    onChange={(e) => handleOptionChange(question.id!, e.target.value)}
                    checked={answers[question.id!] === option}
                  />
                  {option}
                </label>
              </div>
            ))}

            {question.type === 'true-false' && (
              <>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={question.id}
                    value="true"
                    onChange={(e) => handleOptionChange(question.id!, e.target.value)}
                    checked={answers[question.id!] === "true"}
                  />
                  True
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={question.id}
                    value="false"
                    onChange={(e) => handleOptionChange(question.id!, e.target.value)}
                    checked={answers[question.id!] === "false"}
                  />
                  False
                </label>
              </>
            )}

            {question.type === 'short-answer' && (
              <input
                type="text"
                className="border p-2 w-full"
                placeholder="Votre réponse..."
                onChange={(e) => handleOptionChange(question.id!, e.target.value)}
                value={answers[question.id!] || ''}
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Soumettre le Quiz
        </button>
      </form>
    </div>
  );
};

export default TakeQuizPage;
