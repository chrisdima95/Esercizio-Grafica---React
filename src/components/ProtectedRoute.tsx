import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const { user } = useUser();

  if (!user || !user.loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
