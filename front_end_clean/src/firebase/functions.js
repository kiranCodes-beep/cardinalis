import { functions } from './firebase';
import { httpsCallable } from 'firebase/functions';

// For development - connect to emulator if needed
if (process.env.NODE_ENV === 'development') {
  import('firebase/functions').then(({ connectFunctionsEmulator }) => {
    connectFunctionsEmulator(functions, 'localhost', 5010);
  });
}

export const createStripeCheckoutSession = async (cartItems, successUrl, cancelUrl) => {
  try {
    const callable = httpsCallable(functions, 'createStripeCheckoutSession');
    const result = await callable({
      items:cartItems,
      successUrl,
      cancelUrl
    });
    return result.data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const generateInvoice = async (sessionId) => {
  try {
    const callable = httpsCallable(functions, 'generateInvoice');
    const result = await callable({ sessionId });
    return result.data;
  } catch (error) {
    console.error('Error generating invoice:', error);
    throw error;
  }
};
// Payment processing function
export const processPayment = async (amount) => {
  try {
    const callable = httpsCallable(functions, 'processPayment');
    const result = await callable({ amount });
    return result.data;
  } catch (error) {
    console.error('Payment error:', error);
    throw new Error(error.message || 'Payment processing failed');
  }
};

// Other cloud functions can be added here
export const createStripePaymentIntent = async (amount) => {
  try {
    const callable = httpsCallable(functions, 'createPaymentIntent');
    const result = await callable({ amount });
    return result.data;
  } catch (error) {
    console.error('Payment intent error:', error);
    throw new Error(error.message || 'Failed to create payment intent');
  }
};

export const getStripeSession = async (sessionId) => {
  try {
    const callable = httpsCallable(functions, 'getStripeSession');
    const result = await callable({ sessionId });
    return result.data;
  } catch (error) {
    console.error('Error fetching Stripe session:', error);
    throw error;
  }
};