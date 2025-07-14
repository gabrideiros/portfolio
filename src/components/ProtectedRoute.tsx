import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/lib/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const hasToken = localStorage.getItem('admin-token');
        
        if (!hasToken) {
          throw new Error('No token found');
        }

        const isValid = await apiClient.verifyToken();
        
        if (!isValid) {
          localStorage.removeItem('admin-token');
          localStorage.removeItem('admin-authenticated');
          throw new Error('Invalid token');
        }

        setIsAuthenticated(true);
        localStorage.setItem('admin-authenticated', 'true');
      } catch (error) {
        setIsAuthenticated(false);
        navigate('/admin');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}