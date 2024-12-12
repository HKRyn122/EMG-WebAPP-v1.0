import React, { createContext } from 'react';
import { useAuthState } from '../hooks/useAuthState';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { user, loading } = useAuthState();

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}