import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../lib/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (role: 'student' | 'admin', name: string) => void;
  signOut: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading] = useState(false);

  const signIn = (role: 'student' | 'admin', name: string) => {
    setUser({
      id: role === 'admin' ? 'admin-001' : 'student-001',
      email: role === 'admin' ? 'admin@yoga.com' : 'student@yoga.com',
      name: name,
      role: role,
      created_at: new Date().toISOString(),
    });
  };

  const signOut = () => {
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
