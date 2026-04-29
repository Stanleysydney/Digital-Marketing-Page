const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const jwt = require('jsonwebtoken');
const fs = require('fs');

const logFile = 'transactions.log';

// Middleware for authentication
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Payment route
router.post('/payment', authenticateToken, async (req, res) => {
  const { amount, currency, paymentMethodId } = req.body;
  if (!amount || !currency || !paymentMethodId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirmation_method: 'automatic',
      description: 'Digital Marketing Payment',
      metadata: {
        userId: req.user.id
      }
    });

    // Confirm the PaymentIntent to process the payment
    const confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id);

    // Log the transaction with detailed information
    const logEntry = `${new Date().toISOString()} - User: ${req.user.id} - Amount: ${amount} - Currency: ${currency} - Status: ${confirmedPaymentIntent.status} - PaymentIntent ID: ${confirmedPaymentIntent.id}\n`;
    fs.appendFileSync(logFile, logEntry);

    res.json({ success: true, paymentIntent: confirmedPaymentIntent });
  } catch (error) {
    // Log errors for debugging
    const errorLogEntry = `${new Date().toISOString()} - Error: ${error.message} - User: ${req.user.id}\n`;
    fs.appendFileSync(logFile, errorLogEntry);
    res.status(500).json({ error: error.message });
  }
});

// Route to get transaction logs
router.get('/logs', authenticateToken, (req, res) => {
  try {
    const logs = fs.readFileSync(logFile, 'utf8').split('\n').filter(line => line);
    res.json({ logs });
  } catch (error) {
    res.status(500).json({ error: 'Error reading logs' });
  }
});

module.exports = router;