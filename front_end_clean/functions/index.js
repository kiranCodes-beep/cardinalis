require('dotenv').config();
console.log("Loaded STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY);
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2/options");
const admin = require("firebase-admin");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

 

admin.initializeApp();
setGlobalOptions({ region: "asia-south1" });

exports.createStripeCheckoutSession = onCall({ cors: true }, async (request) => {
  try {
    // Validate input
    if (!request.data) {
      throw new HttpsError("invalid-argument", "No data provided");
    }
    if (!request.data.items) {
      throw new HttpsError("invalid-argument", "Items array required");
    }
    if (!Array.isArray(request.data.items)) {
      throw new HttpsError("invalid-argument", "Items must be an array");
    }

    const { items, successUrl, cancelUrl } = request.data;

    // Validate each item
    const lineItems = items.map((item, index) => {
      if (!item.price || isNaN(item.price)) {
        throw new HttpsError("invalid-argument", `Item ${index} has invalid price`);
      }
      if (!item.name) {
        throw new HttpsError("invalid-argument", `Item ${index} missing name`);
      }
      const productData = {
        name: String(item.name).substring(0, 40),
      };
      if (item.description && item.description.trim() !== "") {
        productData.description = String(item.description).substring(0, 100);
      }
      return {
        price_data: {
          currency: "inr",
          product_data: productData,
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: Math.max(1, Number(item.quantity) || 1),
      };
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      metadata: {
        userId: request.auth?.uid || "guest",
        source: "firebase-function"
      }
    });

    return { url: session.url, sessionId: session.id };

  } catch (error) {
    console.error("Error:", error);
    
    if (error.type?.includes("Stripe")) {
      throw new HttpsError("failed-precondition", error.message, {
        stripeCode: error.code,
        statusCode: error.statusCode
      });
    }

    throw new HttpsError("internal", "Payment processing failed", {
      originalError: error.message
    });
  }
});

exports.getStripeSession = onCall({ cors: true }, async (request) => {
  const { sessionId } = request.data;
  if (!sessionId) throw new HttpsError("invalid-argument", "Session ID required");
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return { payment_status: session.payment_status, session };
});

exports.generateInvoice = onCall({ cors: true }, async (request) => {
  try {
    console.log('generateInvoice called with data:', request.data);
    const { sessionId } = request.data;
    if (!sessionId) throw new HttpsError("invalid-argument", "Session ID required");

    console.log('Fetching Stripe session for sessionId:', sessionId);
    // Fetch the Stripe session with line items and customer details
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer'],
    });
    console.log('Stripe session retrieved:', session.payment_status);

    // Prepare invoice data for the template
    const items = session.line_items.data.map(item => ({
      name: item.description || item.price.product, // fallback if no description
      quantity: item.quantity,
      price: (item.price.unit_amount / 100).toFixed(2),
      total: ((item.price.unit_amount * item.quantity) / 100).toFixed(2),
    }));
    console.log('Invoice items prepared:', items);

    // Calculate subtotal, tax, total
    const subtotal = items.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2);
    const total = (session.amount_total / 100).toFixed(2);
    const tax = (parseFloat(total) - parseFloat(subtotal)).toFixed(2);

    console.log('Loading invoice template...');
    // Load and compile the invoice template
    const templatePath = path.join(__dirname, 'templates/invoice.hbs');
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);

    // Prepare data for the template
    const invoiceData = {
      invoiceNumber: session.id,
      customer: {
        name: session.customer_details?.name || '',
        email: session.customer_details?.email || '',
      },
      date: new Date(session.created * 1000).toLocaleString(),
      items,
      subtotal,
      tax,
      total,
      paymentStatus: session.payment_status,
    };
    console.log('Invoice data prepared:', invoiceData);

    // Generate HTML invoice
    const invoiceHtml = template(invoiceData);
    console.log('Invoice HTML generated, length:', invoiceHtml.length);

    // Return as a data URL (for demo; in production, upload to storage and return the public URL)
    const invoiceUrl = `data:text/html;base64,${Buffer.from(invoiceHtml).toString('base64')}`;
    console.log('Invoice URL generated, returning...');

    return { url: invoiceUrl };
  } catch (error) {
    console.error('Error in generateInvoice:', error);
    throw new HttpsError("internal", error.message);
  }
});