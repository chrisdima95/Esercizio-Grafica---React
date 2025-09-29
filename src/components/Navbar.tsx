import React, { JSX } from "react";
import "../styles/Navbar.css";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps): JSX.Element {
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
