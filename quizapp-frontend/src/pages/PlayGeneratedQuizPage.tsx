import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createAttemptApi } from '../api/attemptApi';

const PlayGeneratedQuizPage = () => {
  const navigate = useNavigate();
  const quiz = JSON.parse(localStorage.getItem('generatedQuiz') || '{}');
  const { user } = useAuth();


  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  if (!quiz || !quiz.questions) {
    return (
      <div className="p-6 text-center">
        <p>⛔ Aucun quiz généré à jouer.</p>
        <button onClick={() => navigate('/generate-quiz')} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Générer un quiz
        </button>
      </div>
    );
  }

  const handleAnswer = (questionIndex: number, selected: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: selected }));
  };

const handleSubmit = async () => {
  let points = 0;
  quiz.questions.forEach((q: any, idx: number) => {
    if (answers[idx] === q.correctAnswer) points++;
  });

  setScore(points);
  setShowScore(true);

  // 🔐 Enregistrement de la tentative (optionnel mais recommandé)
  if (user) {
    try {
      const res = await createAttemptApi({
        quizId: "generated", // ou null selon ton backend
        userId: user.id,
        answers: Object.fromEntries(
          Object.entries(answers).map(([k, v]) => [`q${Number(k) + 1}`, v])
        ),
        score: Math.round((points / quiz.questions.length) * 100),
        quizTitle: quiz.title,
      });

      navigate(`/results/${res.id}`);
    } catch (err) {
      console.error("Erreur lors de la sauvegarde de la tentative IA :", err);
    }
  }
};

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>

      {quiz.questions.map((q: any, index: number) => (
        <div key={index} className="mb-6 border p-4 rounded">
          <p className="font-semibold mb-2">
            {index + 1}. {q.questionText}
          </p>
          {q.options.map((opt: string, i: number) => (
            <label key={i} className="block mb-1 text-sm cursor-pointer">
              <input
                type="radio"
                name={`q-${index}`}
                value={opt}
                checked={answers[index] === opt}
                onChange={() => handleAnswer(index, opt)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded w-full">
        Soumettre mes réponses
      </button>

      {showScore && (
        <div className="mt-6 text-center text-lg font-semibold">
          ✅ Vous avez eu {score} / {quiz.questions.length} bonnes réponses
        </div>
      )}
    </div>
  );
};

export default PlayGeneratedQuizPage;
