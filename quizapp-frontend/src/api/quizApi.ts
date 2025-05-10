import api from './api'; // ✅ utilise l'instance configurée
import { Quiz } from '../context/QuizContext';

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
