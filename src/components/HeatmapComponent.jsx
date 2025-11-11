// src/components/HeatmapComponent.jsx
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

// helper to clamp numeric intensity
const clamp = (v, lo = 0, hi = 1) => {
  const n = Number(v);
  if (!isFinite(n)) return 0;
  return Math.max(lo, Math.min(hi, n));
};

const toHeatLayerPoints = (points) => points.map(p => [Number(p[0]), Number(p[1]), clamp(p[2])]);

function HeatLayer({ points, options }) {
  const map = useMap();
  const layerRef = useRef(null);

  useEffect(() => {
    if (!map) return;
    if (layerRef.current) {
      try { map.removeLayer(layerRef.current); } catch (e) { /* noop */ }
      layerRef.current = null;
    }
    if (!points || points.length === 0) return;

    const heat = L.heatLayer(points, options || { radius: 25, blur: 18, maxZoom: 12 });
    heat.addTo(map);
    layerRef.current = heat;

    return () => {
      if (layerRef.current) {
        try { map.removeLayer(layerRef.current); } catch (e) {}
        layerRef.current = null;
      }
    };
  }, [map, points, options]);

  return null;
}

export default function HeatmapComponent({
  bbox = [8, 68, 37, 97], // minLat, minLon, maxLat, maxLon
  rows = 30,
  cols = 30,
  pollInterval = 20000 // ms
}) {
  const [heatPoints, setHeatPoints] = useState([]);
  const [listings, setListings] = useState([]);
  const [showListings, setShowListings] = useState(true);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  // fetch control refs
  const abortRef = useRef(null);
  const mountedRef = useRef(true);
  const pollRef = useRef(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (abortRef.current) abortRef.current.abort();
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  // Fetch heat data
  async function fetchHeat(signal = undefined) {
    setError(null);
    setLoading(true);
    if (abortRef.current) {
      try { abortRef.current.abort(); } catch (e) {}
    }
    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const params = {
        min_lat: bbox[0], max_lat: bbox[2], min_lon: bbox[1], max_lon: bbox[3],
        rows, cols
      };
      const res = await axios.get('/api/heatmap', { params, timeout: 20000, signal: ac.signal });
      if (!mountedRef.current) return;
      const data = res.data || {};
      const raw = data.raw || [];
      const heat = Array.isArray(data.heat) ? data.heat : raw.map(c => [c.lat, c.lon, c.intensity ?? 0]);
      setHeatPoints(toHeatLayerPoints(heat));

      // summary safe
      const scores = raw.length ? raw.map(c => Number(c.score ?? NaN)).filter(v => isFinite(v)) : [];
      setSummary({
        cells: raw.length || heat.length,
        min: scores.length ? Math.min(...scores) : null,
        max: scores.length ? Math.max(...scores) : null
      });

      console.log('[Heatmap] loaded', heat.length, 'points');
    } catch (err) {
      if (!mountedRef.current) return;
      if (axios.isCancel(err)) {
        console.log('[Heatmap] fetch canceled');
      } else {
        console.error('[Heatmap] error', err?.response?.data ?? err.message);
        setError(err?.response?.data?.error || err.message || 'Unknown error');
        setHeatPoints([]);
        setSummary(null);
      }
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }

  // Fetch listings within bbox
  async function fetchListings() {
    try {
      const params = {
        status: 'available',
        min_lat: bbox[0], max_lat: bbox[2], min_lon: bbox[1], max_lon: bbox[3]
      };
      const res = await axios.get('/api/listings', { params, timeout: 10000 });
      if (res.data?.listings) setListings(res.data.listings);
      else setListings([]);
    } catch (err) {
      console.error('Failed to fetch listings', err?.response?.data ?? err.message);
      setListings([]);
    }
  }

  // Claim listing action (demo)
  async function claimListing(id) {
    try {
      await axios.post(`/api/listings/${id}/claim`);
      await fetchListings();
    } catch (err) {
      console.error('claim failed', err?.response?.data ?? err.message);
      alert('Claim failed');
    }
  }

  // initial + polling
  useEffect(() => {
    fetchHeat();
    fetchListings();
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(() => {
      fetchHeat();
      fetchListings();
    }, pollInterval);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bbox, rows, cols, pollInterval]);

  const renderMinMax = () => {
    if (!summary) return '—';
    const { min, max } = summary;
    if (min == null || max == null) return '—';
    return `${Number(min).toFixed(2)} / ${Number(max).toFixed(2)}`;
  };

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ flex: 1, height: 600 }}>
        <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <HeatLayer points={heatPoints} options={{ radius: 25, blur: 18, maxZoom: 12 }} />

          {/* Listings markers */}
          { showListings && listings.map(l => (
            <Marker key={l._id} position={[l.lat, l.lon]}>
              <Popup>
                <div style={{ minWidth: 200 }}>
                  <strong>{l.title}</strong><br />
                  <div style={{ marginTop: 6 }}>{l.description}</div>
                  <div style={{ marginTop: 6 }}>Qty: {l.quantity}</div>
                  <div style={{ marginTop: 6 }}>Pickup: {new Date(l.pickupTime || l.createdAt).toLocaleString()}</div>
                  <div style={{ marginTop: 8 }}>
                    <button onClick={() => claimListing(l._id)} style={{ padding: '6px 10px', background: '#10b981', color: '#fff', border: 'none', borderRadius: 6 }}>Claim</button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        </MapContainer>
      </div>

      <aside style={{ width: 320, padding: 12, border: '1px solid #eee', borderRadius: 8, background: '#fff' }}>
        <h3 style={{ marginTop: 0 }}>Heatmap Controls</h3>

        <div style={{ marginBottom: 8 }}>
          <b>Status:</b>{' '}
          { loading ? <span style={{ color: '#f59e0b' }}>Loading…</span>
            : error ? <span style={{ color: '#ef4444' }}>Error</span>
            : summary ? <span style={{ color: '#10b981' }}>Ready ({summary.cells} cells)</span>
            : <span>Idle</span>
          }
        </div>

        <div style={{ marginBottom: 6 }}>
          <b>Cells:</b> {summary?.cells ?? '—'}
        </div>
        <div style={{ marginBottom: 8 }}>
          <b>Predicted score (min / max):</b><br />{ renderMinMax() }
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <label style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <input type="checkbox" checked={showListings} onChange={e => setShowListings(e.target.checked)} />
            Show restaurant listings
          </label>
          <button onClick={() => { fetchHeat(); fetchListings(); }} disabled={loading} style={{ marginLeft: 'auto', padding: '6px 10px', background: '#0b74de', color: '#fff', borderRadius: 6, border: 'none' }}>{loading ? 'Refreshing…' : 'Refresh'}</button>
        </div>

        <hr />

        <div style={{ marginTop: 8 }}>
          <b>Legend</b>
          <div style={{ marginTop: 8, display: 'grid', gap: 8 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 16, height: 16, background: '#ff4d4f', borderRadius: 3 }} />
              <div>High predicted need</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 16, height: 16, background: '#10b981', borderRadius: 3 }} />
              <div>Restaurant listing</div>
            </div>
          </div>
        </div>

        <hr style={{ margin: '12px 0' }} />

        <div style={{ fontSize: 13, color: '#555' }}>
          Tip: Toggle listings or press Refresh. Listings are polled every {pollInterval/1000}s.
        </div>
      </aside>
    </div>
  );
}
