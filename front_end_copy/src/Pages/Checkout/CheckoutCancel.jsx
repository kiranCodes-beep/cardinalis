import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutCancel.css';

const CheckoutCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="cancel-container">
      <div className="cancel-card">
        <div className="cancel-icon">✕</div>
        <h1>Payment Cancelled</h1>
        <p>Your payment was not completed.</p>
        <p>Your cart has been saved for your convenience.</p>
        
        <div className="action-buttons">
          <button 
            onClick={() => navigate('/cart')} 
            className="return-to-cart"
          >
            Return to Cart
          </button>
          <button 
            onClick={() => navigate('/')} 
            className="continue-shopping"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCancel;