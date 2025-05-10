import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api/authApi';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
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
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const user = await loginUser(email, password);
      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
      });
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

  const signup = async (name: string, email: string, password: string) => {
    try {
      await registerUser(name, email, password);
      navigate('/auth'); // Après inscription réussie, rediriger vers login
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 409) {
          throw new Error('Cet email est déjà utilisé.');
        }
      }
      throw new Error('Erreur lors de l’inscription.');
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
