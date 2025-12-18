
import numpy as np
import joblib
import os
import logging

logger = logging.getLogger(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load model artifacts with error handling
try:
    weights = np.load(os.path.join(BASE_DIR, "models/logistic_weights.npy"))
    bias = np.load(os.path.join(BASE_DIR, "models/logistic_bias.npy"))[0]
    
    scaler_num = joblib.load(os.path.join(BASE_DIR, "models/scaler_num.pkl"))
    scaler_int = joblib.load(os.path.join(BASE_DIR, "models/scaler_int.pkl"))
    logger.info("Model artifacts loaded successfully")
except Exception as e:
    logger.error(f"Failed to load model artifacts: {str(e)}")
    raise

# Numeric features (continuous variables) - to be scaled
numeric_feature_cols = ['age_years', 'ap_hi', 'ap_lo', 'bmi']

# Categorical features (don't need scaling)
categorical_feature_cols = ['cholesterol', 'gluc', 'smoke', 'alco', 'active']

# Interaction term columns
interaction_feature_cols = ['smoke_age', 'smoke_bmi', 'alco_age', 'alco_bmi']

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

def calculate_bmi(height_cm, weight_kg):
    """Calculate BMI from height (cm) and weight (kg)"""
    height_m = height_cm / 100
    return weight_kg / (height_m ** 2)

def calculate_interaction_terms(age_years, bmi, smoke, alco):
    """Calculate interaction terms"""
    return {
        'smoke_age': smoke * age_years,
        'smoke_bmi': smoke * bmi,
        'alco_age': alco * age_years,
        'alco_bmi': alco * bmi
    }

def sigmoid(z):
    """Sigmoid activation function with numerical stability"""
    z = np.clip(z, -500, 500)  # Prevent overflow
    return 1 / (1 + np.exp(-z))

def predict_cardio(input_data):
    """
    Make cardiovascular disease prediction
    
    Args:
        input_data: Dictionary containing patient features
                   Required keys: age_years, height, weight, ap_hi, ap_lo,
                                 cholesterol, gluc, smoke, alco, active
    
    Returns:
        tuple: (label, probability) where label is 0 or 1
    """
    try:
        # Validate input
        validate_input(input_data)
        
        # Extract numeric features
        x_numeric = np.array(
            [input_data[col] for col in numeric_feature_cols],
            dtype=float
        ).reshape(1, -1)
        
        # Calculate interaction terms
        age_years = input_data['age_years']
        bmi = input_data['bmi']
        smoke = input_data['smoke']
        alco = input_data['alco']
        
        interactions = calculate_interaction_terms(age_years, bmi, smoke, alco)
        x_interactions = np.array(
            [interactions[col] for col in interaction_feature_cols],
            dtype=float
        ).reshape(1, -1)
        
        # Scale numeric and interaction features separately (same as training)
        x_numeric_scaled = scaler_num.transform(x_numeric)
        x_interactions_scaled = scaler_int.transform(x_interactions)
        
        # Extract categorical features
        x_categorical = np.array(
            [input_data[col] for col in categorical_feature_cols],
            dtype=float
        ).reshape(1, -1)
        
        # Concatenate all features in correct order: numeric_scaled + categorical + interactions_scaled
        x_final = np.hstack([
            x_numeric_scaled,
            x_categorical,
            x_interactions_scaled
        ])
        
        # Compute prediction
        z = np.dot(x_final, weights) + bias
        proba = sigmoid(z)
        label = int(proba >= 0.5)
        
        return label, float(proba)
    
    except Exception as e:
        logger.error(f"Error in predict_cardio: {str(e)}")
        raise
