// backend/models/Listing.js
const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  quantity: { type: Number, default: 1 },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  address: { type: String, default: '' },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  status: { type: String, enum: ['available','claimed','picked','cancelled'], default: 'available' },
  createdAt: { type: Date, default: Date.now },
  pickupTime: { type: Date, default: null }
});

module.exports = mongoose.model('Listing', ListingSchema);
