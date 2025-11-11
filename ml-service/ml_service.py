# ml_service.py
import math
import numpy as np
import pandas as pd
from fastapi import FastAPI, Query
from pydantic import BaseModel
from typing import List
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib
import os

MODEL_PATH = "demand_model.joblib"
app = FastAPI(title="FoodLink ML Service")

# --- Helper to seed synthetic/historical data ---
def seed_historical_data(n=2000, center_lat=28.6, center_lon=77.2):
    rng = np.random.RandomState(42)
    # random points across a country-sized spread
    lats = center_lat + rng.normal(scale=2.5, size=n)
    lons = center_lon + rng.normal(scale=3.0, size=n)
    pop_density = rng.uniform(100, 15000, size=n)  # persons/km^2
    has_event = rng.binomial(1, 0.07, size=n)  # 7% chance of event/festival
    temp = rng.uniform(15, 40, size=n)  # Celsius
    hour = rng.randint(6, 22, size=n)
    dayofweek = rng.randint(0, 7, size=n)
    # past donations and pickups (simulated)
    past_donations = np.maximum(0, (pop_density / 1000) * rng.normal(loc=3, scale=1.5, size=n)).astype(int)
    pickups = np.maximum(0, past_donations - rng.poisson(1, size=n))
    # produce a target "demand score" that depends on these features
    demand = (pop_density / 1000) * (1 + has_event*2) + (20 - (temp-20)) * 0.1 + rng.normal(scale=3, size=n)
    demand = np.maximum(0, demand)
    df = pd.DataFrame({
        "lat": lats,
        "lon": lons,
        "pop_density": pop_density,
        "has_event": has_event,
        "temp": temp,
        "hour": hour,
        "dayofweek": dayofweek,
        "past_donations": past_donations,
        "pickups": pickups,
        "demand": demand
    })
    return df

# --- Train or load a model ---
def train_model():
    df = seed_historical_data(n=2500)
    features = ["lat", "lon", "pop_density", "has_event", "temp", "hour", "dayofweek", "past_donations", "pickups"]
    X = df[features]
    y = df["demand"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.15, random_state=42)
    model = RandomForestRegressor(n_estimators=80, random_state=42, n_jobs=-1)
    model.fit(X_train, y_train)
    joblib.dump((model, features), MODEL_PATH)
    print("Model trained and saved.")
    return model, features

def load_model():
    if os.path.exists(MODEL_PATH):
        model, features = joblib.load(MODEL_PATH)
        return model, features
    else:
        return train_model()

model, model_features = load_model()

# --- Grid prediction endpoint ---
class GridRequest(BaseModel):
    min_lat: float
    max_lat: float
    min_lon: float
    max_lon: float
    rows: int = 20
    cols: int = 20
    pop_density_default: float = 1000.0
    has_event: int = 0
    temp_celsius: float = 30.0
    hour: int = 12
    dayofweek: int = 2

@app.post("/predict_grid")
def predict_grid(req: GridRequest):
    # create a grid of center points
    lat_lin = np.linspace(req.min_lat, req.max_lat, req.rows)
    lon_lin = np.linspace(req.min_lon, req.max_lon, req.cols)
    grid = []
    samples = []
    for i, lat in enumerate(lat_lin):
        for j, lon in enumerate(lon_lin):
            sample = {
                "lat": lat,
                "lon": lon,
                "pop_density": req.pop_density_default,
                "has_event": req.has_event,
                "temp": req.temp_celsius,
                "hour": req.hour,
                "dayofweek": req.dayofweek,
                "past_donations": max(0, int(req.pop_density_default/100 * 0.5)),  # heuristic
                "pickups": 0
            }
            samples.append(sample)
            grid.append({"row": i, "col": j, "lat": lat, "lon": lon})
    df_samples = pd.DataFrame(samples)
    X = df_samples[model_features]
    preds = model.predict(X)
    # normalize to 0-1 intensity
    minp, maxp = preds.min(), preds.max()
    if maxp - minp < 1e-6:
        norm = np.zeros_like(preds)
    else:
        norm = (preds - minp) / (maxp - minp)
    # assemble geo list
    cells = []
    idx = 0
    for g in grid:
        cells.append({
            "row": g["row"],
            "col": g["col"],
            "lat": g["lat"],
            "lon": g["lon"],
            "score": float(preds[idx]),
            "intensity": float(norm[idx])
        })
        idx += 1
    return {"cells": cells, "summary": {"min": float(minp), "max": float(maxp)}}
