import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../firebase/firebase';

export const handleProceedToPayment = async (items, userId) => {
  try {
    const functions = getFunctions(app);
    
    // For local testing (comment out in production)
    if (process.env.NODE_ENV === 'development') {
      import('firebase/functions').then(({ connectFunctionsEmulator }) => {
        connectFunctionsEmulator(functions, 'localhost', 5001);
      });
    }

    const createCheckoutSession = httpsCallable(functions, 'createStripeCheckoutSession');

    const { data } = await createCheckoutSession({
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        // Add any other required fields
      })),
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    });

    window.location.href = data.url;
  } catch (error) {
    console.error('Checkout error:', error);
    alert(`Payment failed: ${error.message}`);
  }
};