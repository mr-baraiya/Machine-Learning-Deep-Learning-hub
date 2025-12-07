
from flask import Flask, render_template, request
from model_utils import predict_cardio

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    input_data = { key: float(request.form[key]) for key in request.form }
    label, proba = predict_cardio(input_data)
    risk = "High Risk" if label == 1 else "Low Risk"
    return render_template("result.html", risk=risk, probability=round(proba * 100, 2))

if __name__ == "__main__":
    app.run(debug=True)
