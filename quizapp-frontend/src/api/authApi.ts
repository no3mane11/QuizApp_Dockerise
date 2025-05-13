import api from './api';

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

// 🟢 Inscription
export const registerUser = async (username: string, email: string, password: string) => {
  const payload: RegisterPayload = { username, email, password };
  const res = await api.post('/auth/register', payload);
  return res.data;
};

// 🟢 Connexion
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const payload: LoginPayload = { email, password };
  const res = await api.post('/auth/login', payload);
  return res.data;
};
