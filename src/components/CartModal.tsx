import React, { useState, useEffect, ChangeEvent, FormEvent, JSX } from "react";
import "../styles/CartModal.css";

interface Meal {
  id: number;
  name: string;
  description?: string;
  price: number;
  amount: number;
}

interface CartModalProps {
  items: Meal[];
  onClose: () => void;
  resetCart: () => void;
}

interface FormData {
  nome: string;
  telefono: string;
  indirizzo: string;
  email: string;
}

export default function CartModal({ items, onClose, resetCart }: CartModalProps): JSX.Element {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [emptyCartMessage, setEmptyCartMessage] = useState(""); // nuovo stato per messaggio carrello vuoto
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    telefono: "",
    indirizzo: "",
    email: "",
  });

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.amount, 0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setOrderSent(true);
    resetCart();
  };

  const handleOrderClick = () => {
    if (items.length === 0) {
      setEmptyCartMessage("Il carrello è vuoto! Aggiungi dei piatti prima di ordinare 🍽️");
      return;
    }
    setEmptyCartMessage(""); // reset messaggio se ci sono articoli
    setShowOrderForm(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Your Cart</h2>
        <ul>
          {items.map(({ name, amount, price }, i) => (
            <li key={i}>
              <strong>{name}</strong> x {amount} - <span>${price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="cart-total">
          <strong>Total: </strong>${total.toFixed(2)}
        </div>

        {/* Messaggio carrello vuoto */}
        {emptyCartMessage && (
          <p style={{ color: "red", fontWeight: 700, marginTop: "1rem" }}>
            {emptyCartMessage}
          </p>
        )}

        {!showOrderForm && !orderSent && (
          <>
            <button className="order-button" onClick={handleOrderClick}>
              Ordina
            </button>
            <button onClick={onClose} className="close-button" aria-label="Close Cart Modal">
              Close
            </button>
          </>
        )}

        {showOrderForm && !orderSent && (
          <form onSubmit={handleSubmit} className="order-form">
            <label>
              Nome
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
            </label>
            <label>
              Numero di telefono
              <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
            </label>
            <label>
              Indirizzo
              <input type="text" name="indirizzo" value={formData.indirizzo} onChange={handleChange} required />
            </label>
            <label>
              Email
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <button type="submit" className="submit-order-button">
              Invia ordine
            </button>
          </form>
        )}

        {orderSent && (
          <>
            <p style={{ marginTop: "1rem", fontWeight: 700, color: "#4CAF50" }}>Ordine inviato</p>
            <button onClick={onClose} className="close-button" aria-label="Close Cart Modal" />
          </>
        )}
      </div>
    </div>
  );
}
