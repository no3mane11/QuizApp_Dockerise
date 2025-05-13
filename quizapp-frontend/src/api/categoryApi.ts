import api from './api';

export interface Category {
  id: string;
  name: string;
  description: string;
}

// Récupérer toutes les catégories
export const fetchCategories = async (): Promise<Category[]> => {
  const res = await api.get('/categories');
  return res.data;
};

//  Créer une nouvelle catégorie (admin uniquement)
export const createCategory = async (name: string, description: string): Promise<Category> => {
  const res = await api.post('/categories', { name, description });
  return res.data;
};

//  Récupérer les quiz d'une catégorie
export const fetchQuizzesByCategory = async (categoryId: string) => {
  const res = await api.get(`/categories/${categoryId}/quizzes`);
  return res.data;
};
