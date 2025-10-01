import { JSX } from "react";
import { useUser } from "../contexts/UserContext";

export default function Profile(): JSX.Element {
  const { user } = useUser();

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '40px auto' }}>
      <h1>Pagina Profilo</h1>
      {user && (
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2>Benvenuto, {user.name}!</h2>
          <p>Questa è la tua pagina profilo personale.</p>
          <p><strong>Stato:</strong> {user.loggedIn ? 'Loggato' : 'Non loggato'}</p>
        </div>
      )}
    </div>
  );
}

