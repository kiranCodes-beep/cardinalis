import React from 'react';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

export const Cart = () => {
  const { cartItems, removeFromCart, clearCart, subtotal, itemCount, loading, error, updateQuantity } = useCart();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  const navigate = useNavigate();

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button className="continue-shopping" onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id || item.id}>
                {item.image && (
                  <img src={item.image} alt={item.name} className="cart-item-image" onError={e => e.target.style.display = 'none'} />
                )}
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  <div className="item-attributes">
                    <span className="item-attribute">Price: ₹{item.price}</span>
                    <span className="item-attribute">Qty: {item.quantity}</span>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}>+</button>
                  </div>
                  <div className="item-total">₹{(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item._id || item.id)} title="Remove">&times;</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Items:</span>
              <span>{itemCount}</span>
            </div>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row tax">
              <span>Tax (10%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="cart-actions">
              <button className="checkout-btn" onClick={() => navigate('/checkout')}>Proceed to Payment</button>
              <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};