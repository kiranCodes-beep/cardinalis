import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51RiFNSRrzyIP2wRKnRj2kPFPzJpMYyHV8bizgSClrvOntmam6szWwbZryzrp3ssNWUBMCEeKNrzSc6zGVg9PM0To002rdsJFqt');

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Example: $10.00 (replace with your cart total in cents)
    const res = await fetch('http://localhost:5000/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 1000, currency: 'usd' }),
    });
    const { clientSecret } = await res.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setMessage(result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
      setMessage('Payment successful!');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {message && <div>{message}</div>}
    </form>
  );
}

export default function CheckoutStripe() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
} 