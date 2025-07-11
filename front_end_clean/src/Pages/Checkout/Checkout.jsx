import React, { useState } from 'react';
import { useCart } from '../../Context/CartContext';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { createStripeCheckoutSession } from '../../firebase/functions';
import './Checkout.css';

const stripePromise = loadStripe("pk_test_51RiFNSRrzyIP2wRKnRj2kPFPzJpMYyHV8bizgSClrvOntmam6szWwbZryzrp3ssNWUBMCEeKNrzSc6zGVg9PM0To002rdsJFqt");

const Checkout = () => {
  const { cartItems, subtotal, total } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    name: currentUser?.displayName || '',
    email: currentUser?.email || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'India'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    // Validate cart items
    const items = cartItems.map(item => {
      const price = Number(item.price);
      if (isNaN(price) || price <= 0) {
        throw new Error(`Invalid price for ${item.name}`);
      }
      return {
        id: item.id || `temp_${Math.random().toString(36).substring(2, 8)}`,
        name: item.name,
        price: price,
        quantity: Math.max(1, Math.floor(item.quantity) || 1),
        description: item.size ? `Size: ${item.size}` : "",
        image: item.image // Include image if needed by Stripe
      };
    });

    console.log("Submitting to Stripe:", items);

    const response = await createStripeCheckoutSession(
      items,
      `${window.location.origin}/checkout/success`,
      `${window.location.origin}/checkout/cancel`
    );

    if (!response?.url) {
      throw new Error("No checkout URL received");
    }

    // Redirect to Stripe
    const stripe = await stripePromise;
    const { error: stripeError } = await stripe.redirectToCheckout({
      sessionId: response.sessionId,
    });

    if (stripeError) throw stripeError;

  } catch (error) {
    let userMessage = "Payment failed. Please try again.";
    let technicalDetails = {};

    // Handle different error types
    if (error.code) {
      switch (error.code) {
        case "functions/invalid-argument":
          userMessage = "Invalid items in cart. Please check your selections.";
          break;
        case "functions/failed-precondition":
          userMessage = "Payment processor error. Please try again.";
          technicalDetails.stripeCode = error.details?.stripeCode;
          break;
        case "functions/internal":
          userMessage = "Our payment system is currently unavailable. Please contact support.";
          technicalDetails.originalError = error.details?.originalError;
          break;
      }
    }

    setError(userMessage);
    console.error("CHECKOUT ERROR:", {
      userMessage,
      error: {
        message: error.message,
        code: error.code,
        ...technicalDetails,
        stack: error.stack
      },
      cartItems,
      timestamp: new Date().toISOString()
    });
  } finally {
    setLoading(false);
  }
};

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="continue-shopping">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="shipping-form">
          <h3>Shipping Information</h3>

          {/* Shipping Fields */}
          {['name', 'email', 'address', 'city', 'postalCode'].map(field => (
            <div className="form-group" key={field}>
              <label htmlFor={field}>{field === 'postalCode' ? 'Postal Code' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                id={field}
                name={field}
                value={shippingInfo[field]}
                onChange={handleInputChange}
                required
                minLength={field === 'address' ? 10 : 3}
                pattern={field === 'email' ? "[^@\\s]+@[^@\\s]+\\.[^@\\s]+" : field === 'postalCode' ? "[0-9]{6}" : undefined}
              />
            </div>
          ))}

          {/* Country Select */}
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              value={shippingInfo.country}
              onChange={handleInputChange}
              required
              className="country-select"
            >
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          {/* Mobile Summary */}
          <div className="order-summary-mobile">
            <h3>Order Summary</h3>
            <div className="mobile-summary-item"><span>Items:</span><span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span></div>
            <div className="mobile-summary-item"><span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></div>
            <div className="mobile-summary-item"><span>Shipping:</span><span>Free</span></div>
            <div className="mobile-summary-item total"><span>Total:</span><span>₹{total.toFixed(2)}</span></div>
          </div>

          {/* Submit Button */}
          <button type="submit" className={`pay-button ${loading ? 'loading' : ''}`} disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span> Processing...
              </>
            ) : (
              'Proceed to Payment'
            )}
          </button>

          {/* Error Display */}
          {error && (
            <div className="error-message">
              <i className="error-icon">!</i> {error}
            </div>
          )}
        </form>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="order-items">
            {cartItems.map(item => (
              <div key={`${item.id}-${item.size}`} className="order-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="product-image"
                  onError={(e) => { e.target.src = '/images/placeholder-product.jpg'; }}
                />
                <div className="item-details">
                  <p className="product-name">{item.name}</p>
                  {item.size && <p className="product-size">Size: {item.size}</p>}
                  <div className="quantity-price">
                    <span className="product-quantity">Qty: {item.quantity}</span>
                    <span className="product-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
            <div className="summary-row"><span>Shipping</span><span>Free</span></div>
            <div className="summary-row"><span>Tax</span><span>₹{(total - subtotal).toFixed(2)}</span></div>
            <div className="summary-row total"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
