import { useCart } from '../Context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './Cart.css';

const CartPage = () => {
  const { 
    cartItems, removeFromCart, updateQuantity, 
    subtotal, itemCount, total, loading, clearCart 
  } = useCart();
  const navigate = useNavigate();

  if (loading) return <div className="loading">Loading cart...</div>;

  return (
    <div className="cart-container">
      <h2>Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={`${item.id}-${item.size || ''}`} className="cart-item">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="cart-item-image"
                />
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  
                  <div className="item-attributes">
                    {item.size && (
                      <div className="item-attribute">
                        <span>Size:</span>
                        <strong>{item.size}</strong>
                      </div>
                    )}
                    <div className="item-attribute">
                      <span>Price:</span>
                      <strong className="item-price">₹{item.price.toFixed(2)}</strong>
                    </div>
                  </div>
                  
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="item-total">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal ({itemCount} items):</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row tax">
              <span>Tax (2%):</span>
              <span>₹{(subtotal * 0.05).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="cart-actions">
              <button 
            className="checkout-btn" 
            onClick={() => navigate('/checkout')}
            >
            Proceed to Checkout
           </button>
              
              <div className="secondary-actions">
                <Link to="/" className="continue-shopping">
                  Continue Shopping
                </Link>
                <button 
                  onClick={clearCart} 
                  className="clear-cart"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;