// src/context/QuizContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { createQuizApi, getAllQuizzes, getQuizById } from '../api/quizApi';

export type QuestionType = 'multiple-choice' | 'true-false' | 'short-answer';

export interface Question {
  id?: string;
  text: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdBy: string;
  createdAt?: Date; // ✅ createdAt est maintenant optionnel
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: Record<string, string | string[]>;
  score: number;
  completedAt: Date;
}

interface QuizContextType {
  quizzes: Quiz[];
  userAttempts: QuizAttempt[];
  currentQuiz: Quiz | null;
  fetchQuizzes: () => Promise<void>;
  addQuiz: (quiz: Quiz) => void;
  fetchQuizById: (id: string) => Promise<Quiz | undefined>;
  createQuiz: (quiz: Omit<Quiz, 'id'>) => Promise<Quiz>; // ✅ Corrigé
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider = ({ children }: QuizProviderProps) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [userAttempts, setUserAttempts] = useState<QuizAttempt[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);

  const fetchQuizzes = async () => {
    console.log('📥 Appel à fetchQuizzes() lancé');
    try {
      const data = await getAllQuizzes();
      console.log('📦 Quizzes reçus :', data);
      setQuizzes(data);
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des quizzes:', error);
    }
  };
  

  const addQuiz = (quiz: Quiz) => {
    setQuizzes((prev) => [...prev, quiz]);
  };

  const fetchQuizById = async (id: string) => {
    try {
      const quiz = await getQuizById(id);
      setCurrentQuiz(quiz);
      return quiz;
    } catch (error) {
      console.error('Error fetching quiz by id:', error);
    }
  };

  const createQuiz = async (quiz: Omit<Quiz, 'id'>) => {
    try {
      const created = await createQuizApi(quiz);
      setQuizzes((prev) => [...prev, created]);
      return created;
    } catch (error) {
      console.error('Error creating quiz:', error);
      throw error;
    }
  };

  return (
    <QuizContext.Provider value={{ quizzes, userAttempts, currentQuiz, fetchQuizzes, addQuiz, fetchQuizById, createQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};
