import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialize currentUser from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  // Sync currentUser to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Login with backend
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/users/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      if (!res.ok) throw new Error('Invalid email or password');
      const user = await res.json();
      setCurrentUser(user);
      toast.success('Logged in successfully!');
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register with backend
  const register = async (email, password, displayName) => {
    setLoading(true);
    if (!email || !password || !displayName) {
      toast.error('All fields are required');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: displayName, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.error || 'Failed to register');
        throw new Error(data?.error || 'Failed to register');
      }
      toast.success('Account created successfully! Please log in.');
      return data;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setCurrentUser(null);
    // localStorage will be cleared by useEffect
    toast.success('Logged out successfully!');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};