require('dotenv').config();
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Middleware to parse JSON data
app.use(express.json());

// Root route handler
app.get('/', (req, res) => {
  res.send('Hello, Server is running!');
});

// Route handler for creating payment intent and generating ephemeral keys
app.post('/payment-sheet', async (req, res) => {
// Use an existing Customer ID if this is a returning customer.
  const { amount, user, product } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
      phone: user.phone,
      metadata: {
        subscription: product.name
      }
    });

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2022-11-15' }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      customer: customer.id,
      metadata: {
        userDetails: JSON.stringify(user),
        productDetails: JSON.stringify(product),
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Start the server and listen for incoming requests on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});