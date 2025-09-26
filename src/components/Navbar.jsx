import React from 'react';
import './Navbar.css';

export default function Navbar({ cartCount, onCartClick }) {
  return (
    <nav className="navbar">
      <h1>React Meal</h1>
      <button className="cart-button" onClick={onCartClick} aria-label="Your Cart">
        <span className="cart-icon">🛒</span> Your Cart
        <span className="cart-count">{cartCount}</span>
      </button>
    </nav>
  );
}
