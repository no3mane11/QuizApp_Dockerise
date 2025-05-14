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
  const [submitting, setSubmitting] = useState(false);

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
    setError(null); // Clear error
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuiz || !user) return;

    for (const question of currentQuiz.questions) {
      if (!answers[question.id!] || answers[question.id!].trim() === '') {
        setError("Merci de répondre à toutes les questions avant de soumettre.");
        return;
      }
    }

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
      setSubmitting(true);
      const attempt = await createAttemptApi({
        quizId: currentQuiz.id,
        userId: user.id,
        answers,
        score: Math.round((score / currentQuiz.questions.length) * 100),
      });

      navigate(`/results/${attempt.id}`);
    } catch (error) {
      console.error('Error submitting attempt:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !currentQuiz) return <div className="text-center p-8">Chargement du quiz...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">{currentQuiz.title}</h1>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{ width: `${(Object.keys(answers).length / currentQuiz.questions.length) * 100}%` }}
        />
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentQuiz.questions.map((question, index) => (
          <div
            key={question.id}
            className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{index + 1}. {question.text}</h2>
            <span className="text-sm text-gray-500 italic mb-2 block">
              Type: {question.type === 'short-answer' ? 'Réponse courte' : question.type === 'multiple-choice' ? 'Choix multiple' : 'Vrai / Faux'}
            </span>

            {question.type === 'multiple-choice' && question.options?.map((option) => (
              <div key={option}>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    onChange={(e) => handleOptionChange(question.id!, e.target.value)}
                    checked={answers[question.id!] === option}
                    className="accent-blue-600 w-4 h-4"
                  />
                  {option}
                </label>
              </div>
            ))}

            {question.type === 'true-false' && (
              <>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name={question.id}
                    value="true"
                    onChange={(e) => handleOptionChange(question.id!, e.target.value)}
                    checked={answers[question.id!] === "true"}
                    className="accent-blue-600 w-4 h-4"
                  />
                  Vrai
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name={question.id}
                    value="false"
                    onChange={(e) => handleOptionChange(question.id!, e.target.value)}
                    checked={answers[question.id!] === "false"}
                    className="accent-blue-600 w-4 h-4"
                  />
                  Faux
                </label>
              </>
            )}

            {question.type === 'short-answer' && (
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Votre réponse..."
                onChange={(e) => handleOptionChange(question.id!, e.target.value)}
                value={answers[question.id!] || ''}
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-2 rounded-lg font-semibold transition ${
            submitting ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {submitting ? "Soumission..." : "Soumettre le Quiz"}
        </button>
      </form>
    </div>
  );
};

export default TakeQuizPage;
