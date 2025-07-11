import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from Firestore or localStorage
  const loadCart = useCallback(async () => {
    setLoading(true);
    try {
      if (currentUser) {
        const cartSnap = await getDoc(doc(db, 'userCarts', currentUser.uid));
        setCartItems(cartSnap.exists() ? cartSnap.data().items : []);
      } else {
        setCartItems(JSON.parse(localStorage.getItem('guestCart')) || []);
      }
    } catch (error) {
      toast.error('Failed to load cart');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Save cart to appropriate storage
  const saveCart = useCallback(async () => {
    if (loading) return;
    try {
      if (currentUser) {
        await updateDoc(doc(db, 'userCarts', currentUser.uid), {
          items: cartItems,
          updatedAt: serverTimestamp()
        });
      } else {
        localStorage.setItem('guestCart', JSON.stringify(cartItems));
      }
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  }, [cartItems, currentUser, loading]);

  // Merge guest cart on login
  const mergeCarts = useCallback(async () => {
    if (!currentUser) return;
    const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
    if (guestCart.length === 0) return;

    try {
      await updateDoc(doc(db, 'userCarts', currentUser.uid), {
        items: [...cartItems, ...guestCart],
        updatedAt: serverTimestamp()
      });
      localStorage.removeItem('guestCart');
      toast.success('Cart items merged!');
      loadCart();
    } catch (error) {
      console.error('Merge failed:', error);
    }
  }, [currentUser, cartItems, loadCart]);

  // Effects
  useEffect(() => { loadCart(); }, [loadCart]);
  useEffect(() => { saveCart(); }, [saveCart]);
  useEffect(() => { mergeCarts(); }, [mergeCarts]);

  // Cart actions
  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.size === item.size);
      return existing 
        ? prev.map(i => i === existing ? {...i, quantity: i.quantity + (item.quantity || 1)} : i)
        : [...prev, { ...item, quantity: item.quantity || 1 }];
    });
    toast.success(`${item.name} added to cart!`);
  };

  const removeFromCart = (id, size) => {
    setCartItems(prev => prev.filter(i => !(i.id === id && i.size === size)));
    toast.success('Item removed');
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev => prev.map(i => 
      i.id === id && i.size === size ? { ...i, quantity } : i
    ));
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
      subtotal, itemCount, total, loading
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);