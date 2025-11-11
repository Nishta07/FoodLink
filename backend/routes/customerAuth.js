// backend/routes/customerAuth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const router = express.Router();

// Customer Signup
router.post('/cust/signup', async (req, res) => {
  const { username, password, email, phone, location } = req.body;
  try {
    const existing = await Customer.findOne({ $or: [{ username }, { email }] });
    if (existing) return res.status(400).json({ error: 'Username or email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = new Customer({ username, password: hashedPassword, email, phone, location });
    await customer.save();
    res.status(201).json({ message: 'Customer account created successfully!' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Customer signup failed' });
  }
});

// Customer Login (supports email OR username)
router.post('/cust/login', async (req, res) => {
  // Accept either { email, password } or { username, password } or { identifier, password }
  const { email, username, identifier, password } = req.body;

  try {
    const query = identifier
      ? { $or: [{ email: identifier }, { username: identifier }] }
      : email
      ? { email }
      : username
      ? { username }
      : null;

    if (!query) return res.status(400).json({ error: 'Please provide email/username and password' });

    const customer = await Customer.findOne(query);
    if (!customer) {
      console.warn('Login failed: user not found for', query);
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, customer.password);
    if (!isValid) {
      console.warn('Login failed: invalid password for user', customer._id);
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { customerId: customer._id, role: 'customer' },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    res.json({
      token,
      username: customer.username,
      email: customer.email,
      location: customer.location
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Customer login failed' });
  }
});

module.exports = router;
