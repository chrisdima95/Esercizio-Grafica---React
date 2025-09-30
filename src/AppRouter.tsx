import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import Login from "./components/Login";
import Home from "./components/Home";
import Merch from "./components/Merch";
import Profile from "./components/Profile";
import { JSX } from "react";

export default function AppRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <Navbar cartCount={0} onCartClick={() => {}} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}
