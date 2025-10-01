import { NavLink } from "react-router-dom";
import { JSX, useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps): JSX.Element {
  const { user, logout } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Nascondi la navbar quando si scrolla verso il basso
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        // Mostra la navbar quando si scrolla verso l'alto o si è in cima
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${isHidden ? 'hidden' : ''}`}>
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

        <button 
          onClick={toggleTheme}
          style={{
            padding: '8px 12px',
            backgroundColor: theme === 'light' ? '#333' : '#f4f4f4',
            color: theme === 'light' ? 'white' : '#333',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
          title={`Passa al tema ${theme === 'light' ? 'scuro' : 'chiaro'}`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'white', fontWeight: 'bold' }}>
              Ciao, {user.name} 
            </span>
            <button 
              onClick={logout} // Pulsante di logout
              style={{
                padding: '8px 16px',
                backgroundColor: '#7a2601',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="login-link nav-button">
            Accedi 
          </NavLink>
        )}
      </div>
    </nav>
  );
}
