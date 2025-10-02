import React, { JSX, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

interface PrivateRouteProps {
  children: ReactNode;
}

// Componente che protegge le rotte private, reindirizzando al login se l'utente non è autenticato
export default function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const { user } = useUser();

  // Se l'utente non è autenticato, reindirizza alla pagina di login
  if (!user || !user.loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}




