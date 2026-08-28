import React, { createContext, useContext, useState } from 'react';
import { MOCK_USER } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(MOCK_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const switchRole = (newRole) => {
    setUser((prev) => ({
      ...prev,
      role: newRole,
      title: newRole === 'admin' ? 'System Administrator' : newRole === 'recruiter' ? 'Lead Technical Recruiter' : 'Senior Software Engineer'
    }));
  };

  const login = (email, role = 'recruiter') => {
    setUser({
      id: 'usr-1',
      name: email.split('@')[0].toUpperCase(),
      email: email,
      role: role,
      title: role === 'admin' ? 'System Administrator' : role === 'recruiter' ? 'Lead Technical Recruiter' : 'Candidate',
      company: 'HireMind AI Labs',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, switchRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
