import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api/authApi';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void; // 👈 à ajouter
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  // 🔁 Restaurer l'état au rechargement
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);

      const token = response.token;
      const user = response.user;

      setToken(token);
      setUser(user);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/dashboard');
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          throw new Error('Mot de passe incorrect.');
        } else if (error.response.status === 404) {
          throw new Error('Email non trouvé.');
        }
      }
      throw new Error('Erreur lors de la connexion.');
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      await registerUser(username, email, password);
      navigate('/auth'); // après inscription, rediriger vers login
    } catch (error: any) {
      if (error.response?.status === 409) {
        throw new Error('Cet email est déjà utilisé.');
      }
      throw new Error('Erreur lors de l’inscription.');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'ADMIN',
      login,
      signup,
      logout,
      setUser, 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
