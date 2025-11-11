const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../../models/Customer');
const router = express.Router();

// Customer Signup
router.post('/cust/signup', async (req, res) => {
  const { username, password, email, phone, location } = req.body;
  try {
    const existing = await Customer.findOne({ username });
    if (existing) return res.status(400).json({ error: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = new Customer({ username, password: hashedPassword, email, phone, location });
    await customer.save();
    res.status(201).json({ message: 'Customer account created successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Customer signup failed' });
  }
});

// Customer Login
router.post('/cust/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const customer = await Customer.findOne({ username });
    if (!customer) return res.status(400).json({ error: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, customer.password);
    if (!isValid) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { customerId: customer._id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.json({
      token,
      username: customer.username,
      email: customer.email,
      location: customer.location
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Customer login failed' });
  }
});

module.exports = router;
