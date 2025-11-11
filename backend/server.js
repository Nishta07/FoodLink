// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const heatmapRouter = require('./routes/heatmap');
const listingsRouter = require('./routes/listings');
const customerAuthRoutes = require('./routes/customerAuth');
require('dotenv').config();
const axios = require('axios'); // optional if not already installed

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- MongoDB connection ---
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// --- Routes (register routes BEFORE starting the server) ---
app.use('/api/auth', authRoutes);
app.use('/api', heatmapRouter);                 // /api/heatmap
app.use('/api/listings', listingsRouter);       // /api/listings/...
app.use('/api/customerAuth', customerAuthRoutes);


// Optional health check route
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// --- Server start ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
