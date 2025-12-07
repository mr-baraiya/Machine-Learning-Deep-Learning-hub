
from flask import Flask, render_template, request, jsonify
from model_utils import predict_cardio
import logging

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Validate that all required fields are present
        required_fields = ['age_years', 'height', 'weight', 'ap_hi', 'ap_lo', 
                          'cholesterol', 'gluc', 'smoke', 'alco', 'active']
        
        # Convert form data to float
        input_data = {}
        for key in required_fields:
            if key not in request.form:
                raise ValueError(f"Missing required field: {key}")
            try:
                input_data[key] = float(request.form[key])
            except ValueError:
                raise ValueError(f"Invalid value for {key}: must be a number")
        
        # Calculate BMI from height (cm) and weight (kg)
        height_m = input_data['height'] / 100  # Convert cm to meters
        input_data['bmi'] = input_data['weight'] / (height_m ** 2)
        
        # Make prediction
        label, proba = predict_cardio(input_data)
        risk = "High Risk" if label == 1 else "Low Risk"
        
        logger.info(f"Prediction made: {risk} with probability {proba:.2%}")
        
        return render_template("result.html", 
                             risk=risk, 
                             probability=round(proba * 100, 2),
                             input_data=input_data)
    
    except ValueError as ve:
        logger.error(f"Validation error: {str(ve)}")
        return render_template("index.html", error=str(ve))
    
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return render_template("index.html", 
                             error="An error occurred during prediction. Please try again.")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
