// backend/routes/listings.js
const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// GET /api/listings
// optional query params: status, min_lat, max_lat, min_lon, max_lon, limit
router.get('/', async (req, res) => {
  try {
    const { status = 'available', min_lat, max_lat, min_lon, max_lon, limit = 200 } = req.query;
    const q = {};
    if (status) q.status = status;

    if (min_lat && max_lat && min_lon && max_lon) {
      q.lat = { $gte: parseFloat(min_lat), $lte: parseFloat(max_lat) };
      q.lon = { $gte: parseFloat(min_lon), $lte: parseFloat(max_lon) };
    }

    const docs = await Listing.find(q).limit(parseInt(limit, 10)).lean();
    res.json({ ok: true, listings: docs });
  } catch (err) {
    console.error('listings GET error', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// POST /api/listings  - create listing
router.post('/', async (req, res) => {
  try {
    const payload = req.body;
    const doc = await Listing.create(payload);
    res.json({ ok: true, listing: doc });
  } catch (err) {
    console.error('listings POST error', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// POST /api/listings/:id/claim - mark listing as claimed
router.post('/:id/claim', async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Listing.findByIdAndUpdate(id, { status: 'claimed' }, { new: true }).lean();
    if (!doc) return res.status(404).json({ ok: false, error: 'Not found' });
    res.json({ ok: true, listing: doc });
  } catch (err) {
    console.error('claim error', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// POST /api/listings/seed - create sample listings (for demo)
router.post('/seed', async (req, res) => {
  try {
    // sample payload can be provided; otherwise create random demo listings near a bbox
    const { count = 12, center = { lat: 28.61, lon: 77.20 }, spread = 0.3 } = req.body || {};
    const docs = [];
    for (let i = 0; i < count; i++) {
      const lat = center.lat + (Math.random() - 0.5) * spread;
      const lon = center.lon + (Math.random() - 0.5) * spread;
      const listing = await Listing.create({
        title: `Demo surplus #${i+1}`,
        description: 'Ready-to-eat surplus food (demo)',
        quantity: Math.floor(Math.random() * 10) + 1,
        lat, lon,
        address: 'Demo address',
        status: 'available',
        pickupTime: new Date(Date.now() + Math.floor(Math.random() * 4) * 3600 * 1000)
      });
      docs.push(listing);
    }
    res.json({ ok: true, created: docs.length, listings: docs });
  } catch (err) {
    console.error('seed error', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// DELETE /api/listings/cleanup-demo  - deletes demo listings whose title starts with "Demo surplus #"
router.delete('/cleanup-demo', async (req, res) => {
  try {
    const result = await Listing.deleteMany({ title: { $regex: '^Demo surplus #' } });
    res.json({ ok: true, deletedCount: result.deletedCount });
  } catch (err) {
    console.error('cleanup-demo error', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});


module.exports = router;
