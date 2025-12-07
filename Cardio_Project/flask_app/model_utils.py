
import numpy as np
import joblib
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
weights = np.load(os.path.join(BASE_DIR, "../models/logistic_weights.npy"))
bias = np.load(os.path.join(BASE_DIR, "../models/logistic_bias.npy"))
scaler = joblib.load(os.path.join(BASE_DIR, "../models/scaler.pkl"))

feature_cols = [
    'age_years', 'height', 'weight', 'ap_hi', 'ap_lo', 'bmi',
    'cholesterol', 'gluc', 'smoke', 'alco', 'active'
]

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def predict_cardio(input_data):
    x = np.array([input_data[col] for col in feature_cols], dtype=float).reshape(1, -1)
    x_scaled = scaler.transform(x)
    z = np.dot(x_scaled, weights) + bias
    proba = sigmoid(z)[0]
    label = int(proba >= 0.5)
    return label, float(proba)
