// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i));
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increment = (id) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: (i.quantity || 1) + 1 } : i)));
  };

  const decrement = (id) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, (i.quantity || 1) - 1) } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increment, decrement, total }}>
      {children}
    </CartContext.Provider>
  );
}

// ✅ Custom hook for easy usage
export function useCart() {
  return useContext(CartContext);
}
