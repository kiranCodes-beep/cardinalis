const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'YOUR_STRIPE_SECRET_KEY'); // Replace with your secret key
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

admin.initializeApp();

// Compile invoice template
const invoiceTemplate = Handlebars.compile(
  fs.readFileSync(path.join(__dirname, 'templates/invoice.hbs'), 'utf8')
);

exports.createStripeCheckoutSession = functions.https.onCall(async (data, context) => {
  try {
    const { cartItems, userId, successUrl, cancelUrl } = data;
    
    // Create line items for Stripe
    const line_items = cartItems.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: {
            productId: item.id,
            size: item.size || 'N/A'
          }
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Create customer in Stripe if user is logged in
    let customer;
    if (userId && userId !== 'guest') {
      const user = await admin.auth().getUser(userId);
      customer = await stripe.customers.create({
        email: user.email,
        name: user.displayName || undefined,
        metadata: { firebaseUID: userId }
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer: customer?.id,
      metadata: {
        firebaseUID: userId || 'guest'
      }
    });

    return { sessionId: session.id };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new functions.https.HttpsError('internal', 'Failed to create checkout session');
  }
});

exports.generateInvoice = functions.https.onCall(async (data, context) => {
  try {
    const { sessionId } = data;
    
    // Retrieve the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product', 'customer']
    });

    // Format invoice data
    const invoiceData = {
      invoiceNumber: `INV-${session.id.slice(0, 8).toUpperCase()}`,
      date: new Date().toLocaleDateString(),
      customer: {
        name: session.customer_details?.name || 'Guest Customer',
        email: session.customer_details?.email || 'No email provided'
      },
      items: session.line_items.data.map(item => ({
        name: item.price.product.name,
        quantity: item.quantity,
        price: (item.price.unit_amount / 100).toFixed(2),
        total: (item.amount_total / 100).toFixed(2)
      })),
      subtotal: (session.amount_subtotal / 100).toFixed(2),
      tax: 0, // Adjust if you have taxes
      total: (session.amount_total / 100).toFixed(2),
      paymentStatus: session.payment_status
    };

    // Generate HTML from template
    const html = invoiceTemplate(invoiceData);

    // Upload to Firebase Storage (optional)
    const bucket = admin.storage().bucket();
    const file = bucket.file(`invoices/${session.id}.html`);
    await file.save(html, { contentType: 'text/html' });

    // Generate a signed URL for download
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2025' // Far future date
    });

    return { url };
  } catch (error) {
    console.error('Error generating invoice:', error);
    throw new functions.https.HttpsError('internal', 'Failed to generate invoice');
  }
});