// src/pages/CreateQuizPage.tsx
import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { createQuizApi } from '../api/quizApi';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const CreateQuizPage = () => {
  const { addQuiz } = useQuiz();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      text: '',
      type: 'short-answer',
      options: [''],
      correctAnswer: '',
      explanation: '',
    },
  ]);

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const newQuestions = [...questions];
    (newQuestions[index] as any)[field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options![oIndex] = value;
    setQuestions(newQuestions);
  };

  const addOption = (qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options!.push('');
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: uuidv4(),
        text: '',
        type: 'short-answer',
        options: [''],
        correctAnswer: '',
        explanation: '',
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('Veuillez vous connecter pour créer un quiz.');
      return;
    }

    if (!title.trim() || !description.trim() || questions.length === 0) {
      alert('Veuillez remplir tous les champs et ajouter au moins une question.');
      return;
    }

    for (const q of questions) {
      if (!q.text.trim() || !q.correctAnswer.toString().trim()) {
        alert('Toutes les questions doivent avoir un énoncé et une réponse correcte.');
        return;
      }
    }

    const newQuiz = {
      title,
      description,
      createdBy: user.id,
      questions: questions.map((q) => ({
        ...q,
        options: q.type === 'multiple-choice' ? q.options?.filter((opt) => opt.trim() !== '') : undefined,
      })),
    };

    try {
      const savedQuiz = await createQuizApi(newQuiz);
      addQuiz(savedQuiz);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur lors de la création du quiz:', error);
      alert('Erreur lors de la création du quiz. Veuillez réessayer.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Créer un Nouveau Quiz</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-1">Titre du Quiz</label>
          <input
            type="text"
            className="border w-full p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="border w-full p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Questions</h2>

          {questions.map((q, qIndex) => (
            <div key={q.id} className="border p-4 rounded mb-6 shadow">
              <div className="mb-4">
                <label className="block font-semibold mb-1">Texte de la Question</label>
                <input
                  type="text"
                  className="border w-full p-2 rounded"
                  value={q.text}
                  onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-1">Type de Question</label>
                <select
                  className="border w-full p-2 rounded"
                  value={q.type}
                  onChange={(e) => handleQuestionChange(qIndex, 'type', e.target.value)}
                >
                  <option value="short-answer">Short Answer</option>
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="true-false">True/False</option>
                </select>
              </div>

              {/* Multiple Choice Options */}
              {q.type === 'multiple-choice' && (
                <div className="space-y-2">
                  {q.options?.map((option, oIndex) => (
                    <input
                      key={oIndex}
                      type="text"
                      className="border w-full p-2 rounded"
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                      placeholder={`Option ${oIndex + 1}`}
                    />
                  ))}
                  <button
                    type="button"
                    className="mt-2 text-blue-600 hover:underline"
                    onClick={() => addOption(qIndex)}
                  >
                    + Ajouter une Option
                  </button>
                </div>
              )}

              {/* Réponse correcte */}
              <div className="mt-4">
                <label className="block font-semibold mb-1">Réponse Correcte</label>
                <input
                  type="text"
                  className="border w-full p-2 rounded"
                  value={q.correctAnswer}
                  onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                  required
                />
              </div>

              {/* Explication (facultative) */}
              <div className="mt-4">
                <label className="block font-semibold mb-1">Explication (optionnelle)</label>
                <textarea
                  className="border w-full p-2 rounded"
                  value={q.explanation}
                  onChange={(e) => handleQuestionChange(qIndex, 'explanation', e.target.value)}
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition mt-4"
            onClick={addQuestion}
          >
            ➕ Ajouter une Question
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          ✅ Créer le Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuizPage;
