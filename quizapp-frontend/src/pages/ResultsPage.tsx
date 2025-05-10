// src/pages/ResultsPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAttemptByIdApi } from '../api/attemptApi';
import { useQuiz } from '../context/QuizContext';

const ResultsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchQuizById, currentQuiz } = useQuiz();
  const [attempt, setAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const attemptData = await getAttemptByIdApi(id);
        setAttempt(attemptData);
        await fetchQuizById(attemptData.quizId);
        setLoading(false);
      }
    };
    fetchData();
  }, [id, fetchQuizById]);

  if (loading || !attempt || !currentQuiz) return <div className="text-center p-8">Loading results...</div>;

  const { answers, score } = attempt;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Résultats du Quiz</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">Score: {score} %</h2>
        {score >= 70 ? (
          <p className="text-green-600 font-bold">🎉 Félicitations, vous avez réussi !</p>
        ) : (
          <p className="text-red-600 font-bold">🚀 Essayez encore, vous pouvez y arriver !</p>
        )}
        <Link
          to="/"
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Retour à l'accueil
        </Link>
      </div>

      {currentQuiz.questions.map((question, index) => {
        const userAnswer = answers[question.id || ''];
        const correctAnswer = question.correctAnswer;
        const isCorrect =
          question.type === 'short-answer'
            ? userAnswer?.toLowerCase().trim() === correctAnswer.toString().toLowerCase().trim()
            : userAnswer === correctAnswer;

        return (
          <div key={question.id} className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-bold mb-2">
              {index + 1}. {question.text}
            </h3>
            <p><strong>Votre réponse :</strong> {userAnswer || <em>Pas de réponse</em>}</p>
            <p><strong>Bonne réponse :</strong> {correctAnswer}</p>
            <p className={isCorrect ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
              {isCorrect ? "✅ Correct" : "❌ Incorrect"}
            </p>
            {question.explanation && (
              <p className="mt-2 text-gray-600"><strong>Explication :</strong> {question.explanation}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ResultsPage;
