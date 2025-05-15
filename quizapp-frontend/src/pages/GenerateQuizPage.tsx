import React, { useState } from 'react';
import { generateAIQuiz } from '../api/quizApi';
import { useNavigate } from 'react-router-dom';

const GenerateQuizPage = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [category, setCategory] = useState('17'); // Science & Nature by default
  const [numQuestions, setNumQuestions] = useState(5);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const quiz = await generateAIQuiz({ topic, category, numQuestions, difficulty });
      console.log('Generated quiz:', quiz);
      // stocker ou rediriger avec quiz
      // Exemple : stocker dans localStorage ou contexte
      localStorage.setItem('generatedQuiz', JSON.stringify(quiz));
      navigate('/quiz/preview'); // page pour afficher le quiz généré
    } catch (err) {
      alert('Erreur lors de la génération du quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Générer un Quiz IA</h1>

      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Sujet du quiz"
        className="border p-2 mb-2 w-full"
      />

      <input
        type="number"
        min={1}
        max={10}
        value={numQuestions}
        onChange={(e) => setNumQuestions(Number(e.target.value))}
        className="border p-2 mb-2 w-full"
      />

      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="border p-2 mb-2 w-full">
        <option value="easy">Facile</option>
        <option value="medium">Moyen</option>
        <option value="hard">Difficile</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 mb-4 w-full">
        <option value="9">Culture Générale</option>
        <option value="17">Science & Nature</option>
        <option value="18">Informatique</option>
        <option value="23">Histoire</option>
        {/* autres catégories OpenTDB */}
      </select>

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Génération en cours...' : 'Générer le quiz'}
      </button>
    </div>
  );
};

export default GenerateQuizPage;
