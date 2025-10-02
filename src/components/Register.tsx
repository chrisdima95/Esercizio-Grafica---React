import React, { useState, JSX } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

// Componente di registrazione con validazione
export default function Register(): JSX.Element {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({}); // Memorizza i messaggi di errore
  const { login } = useUser(); // Utilizzo la funzione di login esistente
  const navigate = useNavigate(); // Cambia pagina e renderizza l'utente alla home page 

  // Validazione dei campi
  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {}; // Memorizza i messaggi di errore

    // Validazione username
    if (!username) {
      newErrors.username = "Il nome utente è obbligatorio";
    } else if (username.length < 3) {
      newErrors.username = "Il nome utente deve avere almeno 3 caratteri";
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "L'email è obbligatoria";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Inserisci un'email valida";
    }

    // Validazione password
    if (!password) {
      newErrors.password = "La password è obbligatoria";
    } else if (password.length < 6) {
      newErrors.password = "La password deve avere almeno 6 caratteri";
    }

    // Validazione termini e condizioni
    if (!acceptTerms) {
      newErrors.terms = "Devi accettare i termini e condizioni per procedere";
    }

    setErrors(newErrors); // Memorizza i messaggi di errore
    return Object.keys(newErrors).length === 0; // Verifica se ci sono errori
  };

  // Gestione del submit del form di registrazione
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault(); // Previne il default del form
    
    if (validateForm()) {
      // Simula la registrazione e poi effettua il login
      alert(`Registrazione completata con successo!\nBenvenuto ${username}!`);
      login(username); // Effettua il login automatico dopo la registrazione
      navigate('/'); // Reindirizza alla home page
    }
  };

  // Renderizzo il form di registrazione
  return (
    <div className="register-container">
      <h2 className="register-title">
        Registrazione
      </h2>
      
      <form onSubmit={handleSubmit}>
        {/* Campo Username */}
        <div className="form-field">
          <label htmlFor="username" className="form-label">
            Nome utente * 
          </label>
          <input
            id="username"
            type="text"
            placeholder="Inserisci nome utente"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Memorizza il valore dell'input e.target.value
            className={`form-input ${errors.username ? 'error' : ''}`} // Aggiunge la classe error se ci sono errori
          />
          {errors.username && (
            <span className="error-message">
              {errors.username}
            </span>
          )}
        </div>

        {/* Campo Email */}
        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email *
          </label>
          <input
            id="email"
            type="email"
            placeholder="Inserisci la tua email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-input ${errors.email ? 'error' : ''}`}
          />
          {errors.email && (
            <span className="error-message">
              {errors.email}
            </span>
          )}
        </div>

        {/* Campo Password */}
        <div className="form-field">
          <label htmlFor="password" className="form-label">
            Password *
          </label>
          <input
            id="password"
            type="password"
            placeholder="Inserisci la password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`form-input ${errors.password ? 'error' : ''}`}
          />
          {errors.password && (
            <span className="error-message">
              {errors.password}
            </span>
          )}
        </div>

        {/* Checkbox Termini e Condizioni */}
        <div className="checkbox-container">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="checkbox-input"
            />
            <span>
              Accetto i{" "}
              <span className="terms-link">
                termini e condizioni
              </span>
              {" "}*
            </span>
          </label>
          {errors.terms && (
            <span className="error-message">
              {errors.terms}
            </span>
          )}
        </div>

        {/* Pulsante di registrazione */}
        <button
          type="submit"
          className={`register-button ${acceptTerms ? 'enabled' : 'disabled'}`}
        >
          Registrati
        </button>

      </form>
    </div>
  );
}
