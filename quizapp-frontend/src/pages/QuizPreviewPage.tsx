import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuizPreviewPage = () => {
  const navigate = useNavigate();
  const quiz = JSON.parse(localStorage.getItem('generatedQuiz') || '{}');

  if (!quiz.title || !quiz.questions) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">Aucun quiz généré à afficher.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate('/generate-quiz')}
        >
          Générer un quiz
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
      {quiz.questions.map((q: any, index: number) => (
        <div key={index} className="mb-6 border-b pb-4">
          <p className="font-semibold text-lg mb-2">
            {index + 1}. {q.questionText}
          </p>
          <ul className="list-disc ml-6 space-y-1">
            {q.options.map((opt: string, i: number) => (
              <li key={i}>{opt}</li>
            ))}
          </ul>
        </div>
      ))}
<button
  className="mt-4 mr-4 px-4 py-2 bg-blue-600 text-white rounded"
  onClick={() => navigate('/quiz/play')}
>
  Commencer le quiz
</button>
      <button
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded"
        onClick={() => navigate('/')}
      >
        Retour à l’accueil
      </button>
    </div>
  );
};

export default QuizPreviewPage;
