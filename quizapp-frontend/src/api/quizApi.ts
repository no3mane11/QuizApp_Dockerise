import api from './api'; // ✅ utilise l'instance configurée
import { Quiz } from '../context/QuizContext';

export const generateAIQuiz = async (payload: {
  topic: string;
  category: string;
  numQuestions: number;
  difficulty: string;
}) => {
  const response = await api.post('/quizzes/ai-generate', payload);
  return response.data;
};

// ✅ GET tous les quiz
export const getAllQuizzes = async (): Promise<Quiz[]> => {
  const response = await api.get('/quizzes'); // ✅ baseURL est déjà dans api.ts
  return response.data;
};

// ✅ POST créer un quiz
export const createQuizApi = async (quizData: Omit<Quiz, 'id'>) => {
  const response = await api.post('/quizzes', quizData);
  return response.data;
};

// ✅ GET un quiz par ID
export const getQuizById = async (quizId: string): Promise<Quiz> => {
  const response = await api.get(`/quizzes/${quizId}`);
  return response.data;
};


// ✅ PUT mettre à jour un quiz
export const updateQuizApi = async (quizId: string, quizData: Partial<Quiz>) => {
  const response = await api.put(`/quizzes/${quizId}`, quizData);
  return response.data;
};

// ✅ DELETE un quiz par ID
export const deleteQuizById = async (quizId: string) => {
  const response = await api.delete(`/quizzes/${quizId}`);
  return response.data;
}