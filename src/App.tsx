import React, { JSX, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CartModal from "./components/CartModal";
import Product from "./components/Product";
import Login from "./components/Login";
import Home from "./components/Home";
import Merch from "./components/Merch";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";

import { UserProvider } from "./contexts/UserContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProductsProvider } from "./contexts/ProductsContext";

import "./App.css";

interface Meal {
  id: number;
  name: string;
  description: string;
  price: number;
}

const initialMeals: Meal[] = [
  { id: 1, name: "Sushi", description: "Finest fish and veggies", price: 22.99 },
  { id: 2, name: "Schnitzel", description: "Finest breaded and fried meat", price: 12.99 },
  { id: 3, name: "Green Bowl", description: "Healthy...and green...", price: 18.99 },
  { id: 4, name: "Honey", description: "The sweetest taste ever", price: 20.0 },
  { id: 5, name: "Sweeties", description: "The sweeties taste ever", price: 26.0 },
  { id: 6, name: "WINSTER", description: "ryjn", price: 222.0 },
];

interface AmountsMap {
  [key: number]: number;
}

export default function App(): JSX.Element {
  const [amounts, setAmounts] = useState<AmountsMap>(() =>
    initialMeals.reduce((acc, meal) => {
      acc[meal.id] = 0;
      return acc;
    }, {} as AmountsMap)
  );

  const [cartItems, setCartItems] = useState<(Meal & { amount: number })[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const resetCart = () => {
    setCartItems([]);
    setAmounts(
      initialMeals.reduce((acc, meal) => {
        acc[meal.id] = 0;
        return acc;
      }, {} as AmountsMap)
    );
  };

  const handleAddToCart = (meal: Meal) => {
    setAmounts((prev) => {
      const newAmount = prev[meal.id] + 1;
      const newAmounts = { ...prev, [meal.id]: newAmount };

      setCartItems((prevCart) => {
        const found = prevCart.find((item) => item.id === meal.id);
        if (found) {
          return prevCart.map((item) =>
            item.id === meal.id ? { ...item, amount: newAmount } : item
          );
        } else {
          return [...prevCart, { ...meal, amount: newAmount }];
        }
      });

      return newAmounts;
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.amount, 0);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider>
          <ProductsProvider>
            <Navbar cartCount={totalItems} onCartClick={toggleCart} />

            <div className="app-wrapper">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <div className="hero-image">
                        <div className="hero-text">
                          <h1>Delicious Food, Delivered To You</h1>
                          <p>
                            Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.
                          </p>
                          <p>
                            All our meals are cooked with high-quality ingredients, just-in-time and of course by experienced chefs!
                          </p>
                        </div>
                      </div>

                      <div className="meals-section">
                        {initialMeals.map((meal) => (
                          <div key={meal.id} className="meal-item">
                            <div className="meal-name-desc">
                              <h3>{meal.name}</h3>
                              <p><i>{meal.description}</i></p>
                            </div>
                            <div className="meal-controls">
                              <label className="amount-label">Amount</label>
                              <div className="amount-counter">{amounts[meal.id]}</div>
                              <button onClick={() => handleAddToCart(meal)} className="add-button">
                                + Add
                              </button>
                            </div>
                            <div className="price">${meal.price.toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route path="/merch" element={<Merch />} />
                <Route path="/product/:id" element={<Product />} />
              </Routes>
            </div>

            {isCartOpen && <CartModal items={cartItems} onClose={toggleCart} resetCart={resetCart} />}
          </ProductsProvider>
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
