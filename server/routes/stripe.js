const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Your secret key

// POST /api/stripe/create-payment-intent
router.post('/create-payment-intent', async (req, res) => {
  const { amount, currency = 'usd' } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount in cents
      currency,
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stripe/session/:sessionId
router.get('/session/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json({ payment_status: session.payment_status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stripe/invoice/:sessionId
router.get('/invoice/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  try {
    // Retrieve the session to get the invoice or receipt URL
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    // Use receipt_url from the latest payment if available
    const paymentIntentId = session.payment_intent;
    if (!paymentIntentId) return res.status(404).json({ error: 'No payment intent found for this session.' });
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const charges = paymentIntent.charges.data;
    if (charges.length === 0) return res.status(404).json({ error: 'No charges found for this payment intent.' });
    const receiptUrl = charges[0].receipt_url;
    res.json({ url: receiptUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 