"""
Test script for CardioSense FastAPI Backend
Run this after starting the server to verify all endpoints
"""

import requests
import json

BASE_URL = "http://localhost:8000"

# Test data
LOW_RISK_PATIENT = {
    "age": 35,
    "gender": 1,
    "height": 175,
    "weight": 70,
    "ap_hi": 120,
    "ap_lo": 80,
    "cholesterol": 1,
    "gluc": 1,
    "smoke": 0,
    "alco": 0,
    "active": 1
}

HIGH_RISK_PATIENT = {
    "age": 65,
    "gender": 2,
    "height": 165,
    "weight": 95,
    "ap_hi": 160,
    "ap_lo": 100,
    "cholesterol": 3,
    "gluc": 3,
    "smoke": 1,
    "alco": 1,
    "active": 0
}

def test_health_check():
    """Test health check endpoint"""
    print("\n=== Testing Health Check ===")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.status_code == 200

def test_random_forest_prediction(patient_data, label=""):
    """Test Random Forest prediction endpoint"""
    print(f"\n=== Testing Random Forest Prediction {label} ===")
    response = requests.post(
        f"{BASE_URL}/predict/randomforest",
        json=patient_data
    )
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.status_code == 200

def test_logistic_prediction(patient_data, label=""):
    """Test Logistic Regression prediction endpoint"""
    print(f"\n=== Testing Logistic Regression Prediction {label} ===")
    response = requests.post(
        f"{BASE_URL}/predict/logistic",
        json=patient_data
    )
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.status_code == 200

def test_compare_prediction(patient_data, label=""):
    """Test compare models endpoint"""
    print(f"\n=== Testing Compare Models {label} ===")
    response = requests.post(
        f"{BASE_URL}/predict/compare",
        json=patient_data
    )
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.status_code == 200

def test_send_email_report():
    """Test email report endpoint (requires valid SMTP config)"""
    print("\n=== Testing Email Report (Optional - Requires SMTP Config) ===")
    
    # Get prediction first
    compare_response = requests.post(
        f"{BASE_URL}/predict/compare",
        json=LOW_RISK_PATIENT
    )
    
    if compare_response.status_code != 200:
        print("Failed to get prediction for email test")
        return False
    
    prediction_result = compare_response.json()
    
    email_request = {
        "to_email": "baraiyavishalbhai32@gmail.com",  # Replace with test email
        "patient_name": "Test Patient",
        "model_type": "compare",
        "patient_data": LOW_RISK_PATIENT,
        "prediction_result": prediction_result
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/send-report",
            json=email_request,
            timeout=30
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"Email test skipped or failed: {str(e)}")
        print("This is expected if SMTP is not configured")
        return None

def run_all_tests():
    """Run all tests"""
    print("=" * 60)
    print("CardioSense FastAPI Backend Test Suite")
    print("=" * 60)
    
    results = []
    
    # Test health check
    results.append(("Health Check", test_health_check()))
    
    # Test predictions with low risk patient
    results.append(("RF Prediction (Low Risk)", test_random_forest_prediction(LOW_RISK_PATIENT, "(Low Risk)")))
    results.append(("LR Prediction (Low Risk)", test_logistic_prediction(LOW_RISK_PATIENT, "(Low Risk)")))
    results.append(("Compare (Low Risk)", test_compare_prediction(LOW_RISK_PATIENT, "(Low Risk)")))
    
    # Test predictions with high risk patient
    results.append(("RF Prediction (High Risk)", test_random_forest_prediction(HIGH_RISK_PATIENT, "(High Risk)")))
    results.append(("LR Prediction (High Risk)", test_logistic_prediction(HIGH_RISK_PATIENT, "(High Risk)")))
    results.append(("Compare (High Risk)", test_compare_prediction(HIGH_RISK_PATIENT, "(High Risk)")))
    
    # Test email (optional)
    email_result = test_send_email_report()
    if email_result is not None:
        results.append(("Email Report", email_result))
    
    # Print summary
    print("\n" + "=" * 60)
    print("Test Summary")
    print("=" * 60)
    
    for test_name, result in results:
        status = "✓ PASS" if result else "✗ FAIL"
        print(f"{test_name:30} {status}")
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    print("=" * 60)
    print(f"Total: {passed}/{total} tests passed")
    print("=" * 60)

if __name__ == "__main__":
    try:
        run_all_tests()
    except requests.exceptions.ConnectionError:
        print("\n❌ ERROR: Cannot connect to server")
        print("Please ensure the FastAPI server is running on http://localhost:8000")
        print("\nStart server with: python main.py")
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
