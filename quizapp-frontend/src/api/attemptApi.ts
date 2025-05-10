import api from './api';
import { QuizAttempt } from '../context/QuizContext';

export const createAttemptApi = async (attempt: Omit<QuizAttempt, 'id' | 'completedAt'>) => {
  const response = await api.post<QuizAttempt>('/attempts/submit', attempt);
  return response.data;
};

export const getUserAttemptsApi = async (userId: string) => {
  const response = await api.get<QuizAttempt[]>(`/attempts/user/${userId}`);
  return response.data;
};

export const getAllAttemptsApi = async () => {
  const response = await api.get<QuizAttempt[]>('/attempts');
  return response.data;
};

export const getAttemptByIdApi = async (attemptId: string) => {
  const response = await api.get<QuizAttempt>(`/attempts/${attemptId}`);
  return response.data;
};
