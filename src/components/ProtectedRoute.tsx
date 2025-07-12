import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin-authenticated') === 'true';
    
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);

  const isAuthenticated = localStorage.getItem('admin-authenticated') === 'true';

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}