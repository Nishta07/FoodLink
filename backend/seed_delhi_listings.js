// backend/seed_delhi_listings.js
// Usage: node seed_delhi_listings.js
const axios = require('axios');

async function seed() {
  try {
    const url = 'http://localhost:5000/api/listings/seed';
    const payload = {
      count: 50,
      center: { lat: 28.644800, lon: 77.216721 }, // Delhi center
      spread: 0.12
    };
    const resp = await axios.post(url, payload, { timeout: 30000 });
    console.log('Seed response:', resp.data);
    if (resp.data && resp.data.listings) {
      console.log('Sample created item:', resp.data.listings[0]);
    }
  } catch (err) {
    console.error('Seed failed:', err.response ? err.response.data : err.message);
  }
}

seed();
