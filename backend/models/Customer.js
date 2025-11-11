// backend/models/Customer.js
const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  email: { type: String, trim: true },
  phone: { type: String, trim: true },
  location: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', CustomerSchema);
