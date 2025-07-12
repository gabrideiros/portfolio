import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/lib/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin-token');
      const isAuthenticated = localStorage.getItem('admin-authenticated') === 'true';
      
      if (!token || !isAuthenticated) {
        navigate('/admin');
        return;
      }
      
      // Verify token with backend
      const isValid = await apiClient.verifyToken();
      if (!isValid) {
        navigate('/admin');
      }
    };
    
    checkAuth();
  }, [navigate]);

  const token = localStorage.getItem('admin-token');
  const isAuthenticated = localStorage.getItem('admin-authenticated') === 'true';

  if (!token || !isAuthenticated) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}