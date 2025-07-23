import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Load cart from localStorage as fallback
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  // Sync cartItems to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // On login, merge local cart with backend cart
  useEffect(() => {
    if (currentUser && cartItems.length > 0) {
      // Send local cart to backend, then reload cart from backend
      fetch(`http://localhost:5000/api/cart/merge/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems.map(item => ({ ...item, image: item.image })) }),
      })
        .then(() => loadCart());
    }
    // eslint-disable-next-line
  }, [currentUser]);

  // Load cart from backend, fallback to localStorage
  const loadCart = async () => {
    setLoading(true);
    try {
      if (currentUser) {
        const res = await fetch(`http://localhost:5000/api/cart/${currentUser._id}`);
        if (!res.ok) throw new Error('Failed to fetch cart');
        const data = await res.json();
        setCartItems(data.items || []);
        localStorage.setItem('cartItems', JSON.stringify(data.items || []));
      } else {
        // fallback: keep localStorage cart
        setCartItems(JSON.parse(localStorage.getItem('cartItems')) || []);
      }
    } catch (err) {
      setError('Could not load cart from server, using local cart.');
    } finally {
      setLoading(false);
    }
  };

  // Add to cart via backend, fallback to local
  const addToCart = async (item) => {
    const payload = {
      ...item,
      productId: item.productId || item.id, // ensure productId is present
      image: item.image, // ensure image is always sent
    };
    try {
      if (currentUser) {
        const res = await fetch(`http://localhost:5000/api/cart/${currentUser._id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to add to cart');
        const data = await res.json();
        setCartItems(data.cart.items || []);
        localStorage.setItem('cartItems', JSON.stringify(data.cart.items || []));
      } else {
        // fallback: add to localStorage
        setCartItems(prev => {
          const existing = prev.find(i => i.id === item.id);
          if (existing) {
            return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i);
          }
          return [...prev, { ...item, quantity: item.quantity || 1 }];
        });
        setError('Not logged in, added to local cart.');
      }
    } catch (err) {
      setError('Could not sync with server, added to local cart.');
    }
  };

  // Remove from cart via backend, fallback to local
  const removeFromCart = async (itemId) => {
    try {
      if (currentUser) {
        const res = await fetch(`http://localhost:5000/api/cart/${currentUser._id}/${itemId}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to remove from cart');
        const data = await res.json();
        setCartItems(data.cart.items || []);
        localStorage.setItem('cartItems', JSON.stringify(data.cart.items || []));
      } else {
        setCartItems(prev => prev.filter(i => i.id !== itemId));
        setError('Not logged in, removed from local cart.');
      }
    } catch (err) {
      setError('Could not sync with server, removed from local cart.');
    }
  };

  // Update quantity (backend, fallback to local)
  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return removeFromCart(itemId);
    try {
      if (currentUser) {
        const res = await fetch(`http://localhost:5000/api/cart/${currentUser._id}/${itemId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity }),
        });
        if (!res.ok) throw new Error('Failed to update quantity');
        const data = await res.json();
        setCartItems(data.cart.items || []);
        localStorage.setItem('cartItems', JSON.stringify(data.cart.items || []));
      } else {
        setCartItems(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i));
        setError('Not logged in, updated local cart.');
      }
    } catch (err) {
      setError('Could not sync with server, updated local cart.');
    }
  };

  // Clear cart (remove all items)
  const clearCart = async () => {
    if (currentUser) {
      for (const item of cartItems) {
        await removeFromCart(item._id || item.id);
      }
    } else {
      setCartItems([]);
      localStorage.removeItem('cartItems');
    }
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  useEffect(() => {
    loadCart();
    // eslint-disable-next-line
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      setCartItems([]);
      localStorage.removeItem('cartItems');
    }
  }, [currentUser]);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, clearCart, updateQuantity,
      subtotal, itemCount, total, loading, error
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);