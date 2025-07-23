// src/components/ProtectedRoute.jsx
import { useAuth } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner'; // Optional loading component

export const ProtectedRoute = ({ children, requireVerifiedEmail = false }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />; // Or any loading indicator
  }

  if (!currentUser) {
    // Redirect to login page, saving the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireVerifiedEmail && !currentUser.emailVerified) {
    return <Navigate to="/verify-email" state={{ from: location }} replace />;
  }

  return children;
};