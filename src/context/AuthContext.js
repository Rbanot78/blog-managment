import React, { createContext, useState, useEffect } from 'react';
import { ROLES } from '../utils/constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('blogUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    return new Promise((resolve, reject) => {
      // Simple validation - in a real app, this would be an API call
      if (!username || !password) {
        reject(new Error('Username and password are required'));
        return;
      }

      // Mock user validation
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          u => u.username === username && u.password === password
        );
        
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem('blogUser', JSON.stringify(foundUser));
          resolve(foundUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 300); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('blogUser');
  };

  const hasRole = (requiredRole) => {
    if (!user) return false;
    if (user.role === ROLES.ADMIN) return true;
    return user.role === requiredRole;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Mock users data - in a real app, this would come from an API
const MOCK_USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: ROLES.ADMIN
  },
  {
    id: 2,
    username: 'editor',
    password: 'editor123',
    role: ROLES.EDITOR
  },
  {
    id: 3,
    username: 'viewer',
    password: 'viewer123',
    role: ROLES.VIEWER
  }
];