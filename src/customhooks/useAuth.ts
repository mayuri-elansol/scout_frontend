'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  username: string;
  name: string;
  role: string;
  lastLogin: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }
      
      const token = localStorage.getItem('scout_auth_token');
      const userData = localStorage.getItem('scout_user');
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData: User, token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('scout_auth_token', token);
      localStorage.setItem('scout_user', JSON.stringify(userData));
    }
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('scout_auth_token');
      localStorage.removeItem('scout_user');
    }
    setUser(null);
    setIsAuthenticated(false);
    router.push('/LoginPage');
  };

  const requireAuth = (redirectTo = '/LoginPage') => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
      return false;
    }
    return isAuthenticated;
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    requireAuth,
    checkAuthStatus,
  };
};
