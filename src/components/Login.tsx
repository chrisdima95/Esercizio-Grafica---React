import React, { useState, JSX } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

// Componente di login che utilizza il contesto UserContext
export default function Login(): JSX.Element {
  const [username, setUsername] = useState("");
  const { login } = useUser(); // Accedi alla funzione di login dal contesto
  const navigate = useNavigate();

  // Gestione del submit del form di login
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (username.trim()) { // Verifica che l'username non sia vuoto
      login(username.trim()); // Esegui il login con l'username inserito
      navigate('/'); // Reindirizza alla home page dopo il login
    } else {
      alert("Inserisci un username valido");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "40px auto", color: "black", backgroundColor: "white", borderRadius: "8px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nome utente</label>
        <input
          id="username"
          type="text"
          placeholder="Inserisci nome utente"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            margin: "10px 0 20px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
            boxSizing: "border-box"
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#7a2601",
            color: "white",
            fontWeight: 700,
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Accedi
        </button>
      </form>
    </div>
  );
}
