// src/context/AttemptContext.tsx

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { createAttemptApi, getUserAttemptsApi } from "../api/attemptApi";
import { useAuth } from "./AuthContext";

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: { questionId: string; answer: string | string[] }[];
  score: number;
  completedAt: string;
}

interface AttemptContextType {
  attempts: QuizAttempt[];
  fetchUserAttempts: () => Promise<void>;
  createAttempt: (attemptData: Omit<QuizAttempt, "id" | "score" | "completedAt">) => Promise<void>;
}

const AttemptContext = createContext<AttemptContextType | undefined>(undefined);

export const useAttempt = () => {
  const context = useContext(AttemptContext);
  if (!context) {
    throw new Error("useAttempt must be used within an AttemptProvider");
  }
  return context;
};

interface AttemptProviderProps {
  children: ReactNode;
}

export const AttemptProvider = ({ children }: AttemptProviderProps) => {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const { user } = useAuth();

  const fetchUserAttempts = async () => {
    if (!user) return;
    try {
      const data = await getUserAttemptsApi(user.id);
      setAttempts(data);
    } catch (error) {
      console.error("Failed to fetch attempts:", error);
    }
  };

  const createAttempt = async (attemptData: Omit<QuizAttempt, "id" | "score" | "completedAt">) => {
    try {
      await createAttemptApi(attemptData);
      await fetchUserAttempts(); // Refresh after creation
    } catch (error) {
      console.error("Failed to create attempt:", error);
    }
  };

  useEffect(() => {
    fetchUserAttempts();
  }, [user]);

  return (
    <AttemptContext.Provider value={{ attempts, fetchUserAttempts, createAttempt }}>
      {children}
    </AttemptContext.Provider>
  );
};