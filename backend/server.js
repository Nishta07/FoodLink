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
const path = require('path');
const fs = require('fs');

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

// --- API Routes (register routes BEFORE serving frontend) ---
app.use('/api/auth', authRoutes);
app.use('/api', heatmapRouter);                 // /api/heatmap
app.use('/api/listings', listingsRouter);       // /api/listings/...
app.use('/api/customerAuth', customerAuthRoutes);

// Optional health check route
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// ----------------------
// Frontend static server
// ----------------------
// Support both CRA (build/) and Vite (dist/) output directories.
// This makes local dev, docker, and Render builds work reliably.
const buildPath = path.join(__dirname, '..', 'build');
const distPath = path.join(__dirname, '..', 'dist');

if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get(/^\/.*$/, function (req, res) {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
  console.log('Serving frontend from /build');
} else if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get(/^\/.*$/, function (req, res) {
    res.sendFile(path.join(distPath, 'index.html'));
  });
  console.log('Serving frontend from /dist');
} else {
  // Helpful error message when build step did not run in container/platform
  app.get(/^\/.*$/, function (req, res) {
    res.status(500).send(
      'Frontend files not found. Expected /build or /dist. Did the frontend build step run?'
    );
  });
  console.warn('Warning: No frontend build found (no /build or /dist).');
}

// --- Server start ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
