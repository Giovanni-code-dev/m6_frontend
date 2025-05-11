import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { fetchLoggedUser } from '../../utils/api';

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();


  useEffect(() => {
    const checkAuth = async () => {
      try {
        await fetchLoggedUser();
        setIsAuthenticated(true);

      } catch (err) {
        console.warn('Non autenticato:', err.message);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;


  return children;
};

export default ProtectedRoute;
