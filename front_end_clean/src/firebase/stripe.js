import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';

// Stripe Checkout functions
export const createStripeCheckoutSession = async (cartItems, userId, successUrl, cancelUrl) => {
  try {
    const callable = httpsCallable(functions, 'createStripeCheckoutSession');
    const result = await callable({
      cartItems,
      userId,
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