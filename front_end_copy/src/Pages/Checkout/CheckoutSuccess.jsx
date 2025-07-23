import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import './CheckoutSuccess.css';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [order, setOrder] = useState(null);
  const [invoiceUrl, setInvoiceUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [invoiceError, setInvoiceError] = useState('');

  useEffect(() => {
    const storedOrder = localStorage.getItem('currentOrder');
    if (!storedOrder) {
      navigate('/');
      return;
    }

    const orderData = JSON.parse(storedOrder);
    setOrder(orderData);

    const checkAndGenerate = async () => {
      try {
        // Fetch payment status from backend
        const sessionRes = await fetch(`/api/stripe/session/${orderData.sessionId}`);
        if (!sessionRes.ok) throw new Error('Failed to fetch payment status');
        const sessionData = await sessionRes.json();
        setPaymentStatus(sessionData.payment_status);
        if (sessionData.payment_status === 'paid') {
          // Fetch invoice URL from backend
          const invoiceRes = await fetch(`/api/stripe/invoice/${orderData.sessionId}`);
          if (!invoiceRes.ok) throw new Error('Failed to generate invoice');
          const invoiceData = await invoiceRes.json();
          setInvoiceUrl(invoiceData.url);
          localStorage.removeItem('currentOrder');
        }
      } catch (error) {
        console.error('Error checking payment status or generating invoice:', error);
        setInvoiceError('Could not generate invoice. Please contact support.');
      } finally {
        setLoading(false);
      }
    };

    checkAndGenerate();
  }, [navigate]);

  if (loading) {
    return <div className="loading">Processing your order...</div>;
  }

  if (!order) {
    return <div className="error">No order found</div>;
  }

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">&#10003;</div>
        <h1>Payment {paymentStatus === 'paid' ? 'Successful' : paymentStatus === 'unpaid' ? 'Unpaid' : paymentStatus}</h1>
        <p>Thank you for your purchase!</p>
        <p>A confirmation email has been sent to {currentUser?.email || 'your email'}.</p>
        <div className="order-details">
          <h3>Order Details</h3>
          <p>Order Total: ₹{order.total.toFixed(2)}</p>
          <p>Items: {order.cartItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
        </div>
        {paymentStatus === 'paid' && invoiceUrl && (
          <a 
            href={invoiceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="invoice-link"
          >
            Download Invoice
          </a>
        )}
        {invoiceError && <div className="error">{invoiceError}</div>}
        <button 
          onClick={() => navigate('/')} 
          className="continue-shopping"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;