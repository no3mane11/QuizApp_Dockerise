// src/types.ts
export interface User {
  id: string;
  username: string;
  email: string;
  role?: 'USER' | 'ADMIN'; // ou tout autre rôle
  createdAt?: string;
  updatedAt?: string;
}
