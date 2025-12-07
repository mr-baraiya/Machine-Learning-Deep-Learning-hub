
import numpy as np
import joblib
import os
import logging

logger = logging.getLogger(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load model artifacts with error handling
try:
    weights = np.load(os.path.join(BASE_DIR, "models/logistic_weights.npy"))
    bias = np.load(os.path.join(BASE_DIR, "models/logistic_bias.npy"))
    scaler = joblib.load(os.path.join(BASE_DIR, "models/scaler.pkl"))
    logger.info("Model artifacts loaded successfully")
except Exception as e:
    logger.error(f"Failed to load model artifacts: {str(e)}")
    raise

# Features that need to be scaled (continuous variables)
scaled_feature_cols = ['age_years', 'height', 'weight', 'ap_hi', 'ap_lo', 'bmi']

# Features that don't need scaling (categorical variables)
categorical_feature_cols = ['cholesterol', 'gluc', 'smoke', 'alco', 'active']

# All features in the correct order
all_feature_cols = scaled_feature_cols + categorical_feature_cols

# Define reasonable ranges for input validation
INPUT_RANGES = {
    'age_years': (1, 120),
    'height': (50, 250),
    'weight': (20, 300),
    'ap_hi': (50, 300),
    'ap_lo': (30, 200),
    'bmi': (10, 60),
    'cholesterol': (1, 3),
    'gluc': (1, 3),
    'smoke': (0, 1),
    'alco': (0, 1),
    'active': (0, 1)
}

def validate_input(input_data):
    """Validate input data ranges"""
    for col, value in input_data.items():
        if col in INPUT_RANGES:
            min_val, max_val = INPUT_RANGES[col]
            if not (min_val <= value <= max_val):
                raise ValueError(f"{col} must be between {min_val} and {max_val}, got {value}")

def sigmoid(z):
    """Sigmoid activation function with numerical stability"""
    z = np.clip(z, -500, 500)  # Prevent overflow
    return 1 / (1 + np.exp(-z))

def predict_cardio(input_data):
    """
    Make cardiovascular disease prediction
    
    Args:
        input_data: Dictionary containing patient features
    
    Returns:
        tuple: (label, probability) where label is 0 or 1
    """
    try:
        # Validate input
        validate_input(input_data)
        
        # Separate scaled and categorical features
        x_continuous = np.array([input_data[col] for col in scaled_feature_cols], dtype=float).reshape(1, -1)
        x_categorical = np.array([input_data[col] for col in categorical_feature_cols], dtype=float).reshape(1, -1)
        
        # Scale only the continuous features
        x_scaled = scaler.transform(x_continuous)
        
        # Concatenate scaled continuous features with categorical features
        x_final = np.concatenate([x_scaled, x_categorical], axis=1)
        
        # Compute prediction
        z = np.dot(x_final, weights) + bias
        proba = sigmoid(z)[0]
        label = int(proba >= 0.5)
        
        return label, float(proba)
    
    except Exception as e:
        logger.error(f"Error in predict_cardio: {str(e)}")
        raise
