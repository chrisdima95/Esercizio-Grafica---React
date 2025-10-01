import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  loggedIn: boolean;
}

// Definizione del tipo per il contesto dell'utente
interface UserContextType {
  user: User | null; //nessun utente loggato
  login: (name: string) => void; 
  logout: () => void; 
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook personalizzato per accedere al contesto dell'utente
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

// Componente Provider che gestisce lo stato dell'utente
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Funzione di login che imposta l'utente con il nome e loggedIn a true
  const login = (name: string) => {
    setUser({ name, loggedIn: true });
  };

  // Funzione di logout che imposta l'utente a null
  const logout = () => {
    setUser(null);
  };

  // Valore del contesto che include l'utente e le funzioni di login/logout
  const value = {
    user,
    login,
    logout,
  };

  // Restituisce il provider con il valore del contesto
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
