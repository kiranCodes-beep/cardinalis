import React, { useState } from 'react';
import { useCart } from '../../Context/CartContext';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Checkout.css';

const stripePromise = loadStripe("pk_test_51RiFNSRrzyIP2wRKnRj2kPFPzJpMYyHV8bizgSClrvOntmam6szWwbZryzrp3ssNWUBMCEeKNrzSc6zGVg9PM0To002rdsJFqt");

function CheckoutForm({ cartItems, subtotal, total, shippingInfo, setShippingInfo, handleInputChange, loading, setLoading, error, setError }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Calculate amount in cents
      const amount = Math.round(total * 100);
      // Create payment intent on backend
      const res = await fetch('http://localhost:5000/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency: 'inr' }), // changed to INR
      });
      const { clientSecret } = await res.json();
      // Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        setError(null);
        navigate('/checkout/success');
      }
    } catch (error) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
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
          <CardElement />
          <button type="submit" className={`pay-button ${loading ? 'loading' : ''}`} disabled={loading || !stripe}>
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
  );
}

const Checkout = () => {
  const { cartItems, subtotal, total } = useCart();
  const { currentUser } = useAuth();
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
  const navigate = useNavigate(); // <-- Added this line
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
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
        <Elements stripe={stripePromise}>
          <CheckoutForm
            cartItems={cartItems}
            subtotal={subtotal}
            total={total}
            shippingInfo={shippingInfo}
            setShippingInfo={setShippingInfo}
            handleInputChange={handleInputChange}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
          />
        </Elements>
        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="order-items">
            {cartItems.map(item => (
              <div key={`${item.id}-${item.size}`} className="order-item">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-image"
                    onError={e => e.target.style.display = 'none'}
                  />
                )}
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
