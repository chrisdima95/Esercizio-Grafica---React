import { NavLink } from "react-router-dom";
import { JSX } from "react";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps): JSX.Element {
  return (
    <nav className="navbar">
      <h1>React Meal</h1>

      <div className="navbar-center">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-button active" : "nav-button"} end>
          Home
        </NavLink>
        <NavLink to="/merch" className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}>
          Merch
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}>
          Profile
        </NavLink>
      </div>

      <div className="navbar-right">
        <button className="cart-button" onClick={onCartClick} aria-label="Your Cart">
          <span className="cart-icon">🛒</span> Your Cart
          <span className="cart-count">{cartCount}</span>
        </button>

        <NavLink to="/login" className="login-link nav-button">
          Login
        </NavLink>
      </div>
    </nav>
  );
}
