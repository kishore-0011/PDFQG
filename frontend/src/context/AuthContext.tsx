// AuthContext.tsx
import React, { createContext, useEffect, useState } from 'react';
import api from '../api/axios';

export interface User {
  id: string;
  email: string;
  plan: 'free' | 'pro';
  quizCount: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me", { withCredentials: true });
      setUser(res.data.user);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 401) {
        setUser(null);
      } else {
        console.error("Error fetching user", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
