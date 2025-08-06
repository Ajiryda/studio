'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/lib/types';
import { students } from '@/lib/mock-data';

interface AuthContextType {
  user: User | null;
  login: (id: string, pass: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('healthcheck-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('healthcheck-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (id: string, pass: string): Promise<boolean> => {
    setLoading(true);
    // Admin login
    if (id.toLowerCase() === 'admin' && pass === '060894') {
      const adminUser: User = { id: 'admin', name: 'Admin', role: 'admin' };
      localStorage.setItem('healthcheck-user', JSON.stringify(adminUser));
      setUser(adminUser);
      setLoading(false);
      router.push('/');
      return true;
    }
    
    // Guru login (mock)
    if (id.toLowerCase() === 'guru' && pass === 'guru123') {
        const guruUser: User = { id: 'guru', name: 'Guru', role: 'guru' };
        localStorage.setItem('healthcheck-user', JSON.stringify(guruUser));
        setUser(guruUser);
        setLoading(false);
        router.push('/');
        return true;
    }


    // Student login
    const student = students.find(s => s.id.toString() === id);
    if (student && pass === id) { // Password is the same as student ID
      const studentUser: User = { id: student.id.toString(), name: student.name, role: 'siswa', class: student.class };
      localStorage.setItem('healthcheck-user', JSON.stringify(studentUser));
      setUser(studentUser);
      setLoading(false);
      router.push('/');
      return true;
    }

    setLoading(false);
    return false;
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem('healthcheck-user');
    setUser(null);
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
