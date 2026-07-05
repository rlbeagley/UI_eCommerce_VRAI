import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, variant) => {
    setCartItems(prev => {
      
      const existing = prev.find(
        item => item.id === product.id && item.variant.size === variant.size
      );

      if (existing) {

        return prev.map(item =>
          item.id === product.id && item.variant.size === variant.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // new item
      return [...prev, { ...product, variant, quantity: 1 }];
    });
  };

  const removeFromCart = (id, size) => {
    setCartItems(prev =>
      prev.filter(item => !(item.id === id && item.variant.size === size))
    );
  };

  const updateQuantity = (id, size, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.variant.size === size
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}