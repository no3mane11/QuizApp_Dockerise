import api from './api';
import axios from 'axios';
import { User } from '../types';

// 🔐 Ajouter automatiquement le token JWT si besoin
const authHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ GET /api/users
export const fetchUsers = async () => {
  const res = await api.get('/users', authHeaders());
  return res.data;
};

// ✅ GET /api/users/{id}
export const getUserById = async (id: string) => {
  const res = await api.get(`/users/${id}`, authHeaders());
  return res.data;
};


export const updateCurrentUser = async (data: Partial<User>) => {
  const response = await axios.put('/users/me', data);
  return response.data;
};

// ✅ PUT /api/users/{id}
export const updateUserById = async (id: string, userData:any) => {
  const res = await api.put(`/users/${id}`, userData, authHeaders());
  return res.data;
};

// ✅ DELETE /api/users/{id}
export const deleteUserById = async (id: string) => {
  const res = await api.delete(`/users/${id}`, authHeaders());
  return res.data;
};
