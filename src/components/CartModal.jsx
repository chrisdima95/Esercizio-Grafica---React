import { useState } from 'react';
import './CartModal.css';

export default function CartModal({ items, onClose, resetCart }) {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    telefono: '',
    indirizzo: '',
    email: ''
  });

  const total = items.reduce((sum, item) => sum + item.price * item.amount, 0);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderSent(true);
    resetCart();
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

        {!showOrderForm && !orderSent && (
          <>
            <button
              className="order-button"
              onClick={() => setShowOrderForm(true)}
            >
              Ordina
            </button>
            <button
              onClick={onClose}
              className="close-button"
              aria-label="Close Cart Modal"
            >
              Close
            </button>
          </>
        )}

        {showOrderForm && !orderSent && (
          <form onSubmit={handleSubmit} className="order-form">
            <label>
              Nome
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Numero di telefono
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Indirizzo
              <input
                type="text"
                name="indirizzo"
                value={formData.indirizzo}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit" className="submit-order-button">
              Invia ordine
            </button>
          </form>
        )}

        {orderSent && (
          <>
            <p style={{ marginTop: '1rem', fontWeight: '700', color: '#4CAF50' }}>
              Ordine inviato
            </p>
            <button
              onClick={onClose}
              className="close-button"
              aria-label="Close Cart Modal"
            >
              Chiudi
            </button>
          </>
        )}
      </div>
    </div>
  );
}
