// backend/routes/heatmap.js  (fallback-ready)
const express = require('express');
const axios = require('axios');
const router = express.Router();

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8001/predict_grid';

// helper to generate synthetic grid (quick fallback)
function generateSyntheticGrid(min_lat, max_lat, min_lon, max_lon, rows, cols) {
  const latStep = (max_lat - min_lat) / (rows - 1 || 1);
  const lonStep = (max_lon - min_lon) / (cols - 1 || 1);
  const cells = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const lat = min_lat + i * latStep;
      const lon = min_lon + j * lonStep;
      // simple synthetic intensity: higher near center
      const centerLat = (min_lat + max_lat) / 2;
      const centerLon = (min_lon + max_lon) / 2;
      const dist = Math.sqrt(Math.pow(lat - centerLat, 2) + Math.pow(lon - centerLon, 2));
      // invert distance to get higher in center; clamp
      const intensity = Math.max(0, 1 - (dist / Math.max((max_lat - min_lat), (max_lon - min_lon))));
      const score = intensity * 100; // synthetic score
      cells.push({ row: i, col: j, lat, lon, score, intensity });
    }
  }
  return { cells, summary: { min: 0, max: 100 } };
}

router.get('/heatmap', async (req, res) => {
  try {
    const min_lat = parseFloat(req.query.min_lat) || 8.0;
    const max_lat = parseFloat(req.query.max_lat) || 37.0;
    const min_lon = parseFloat(req.query.min_lon) || 68.0;
    const max_lon = parseFloat(req.query.max_lon) || 97.0;
    const rows = parseInt(req.query.rows || '30', 10);
    const cols = parseInt(req.query.cols || '30', 10);

    const payload = {
      min_lat, max_lat, min_lon, max_lon, rows, cols,
      pop_density_default: parseFloat(req.query.pop_density) || 1000,
      has_event: parseInt(req.query.has_event || '0', 10),
      temp_celsius: parseFloat(req.query.temp || '30'),
      hour: parseInt(req.query.hour || '12', 10),
      dayofweek: parseInt(req.query.dayofweek || '2', 10)
    };

    // Try ML service
    try {
      const response = await axios.post(ML_SERVICE_URL, payload, { timeout: 8000 });
      const cells = response.data.cells || [];
      const heatPoints = cells.map(c => [c.lat, c.lon, c.intensity]);
      return res.json({ heat: heatPoints, raw: cells, used: 'ml' });
    } catch (mlErr) {
      console.warn('Heatmap ML service unreachable, falling back to synthetic grid:', mlErr.message || mlErr);
      const fallback = generateSyntheticGrid(min_lat, max_lat, min_lon, max_lon, rows, cols);
      const cells = fallback.cells;
      const heatPoints = cells.map(c => [c.lat, c.lon, c.intensity]);
      return res.json({ heat: heatPoints, raw: cells, used: 'synthetic' });
    }
  } catch (err) {
    console.error('🔥 Heatmap route error:', err);
    res.status(500).json({ error: 'Failed to get heatmap', details: err.message });
  }
});

module.exports = router;
