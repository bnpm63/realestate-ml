from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)  

model = joblib.load('best_model.pkl')

@app.route('/predict', methods=['POST'])
def predict_price():
    data = request.get_json()
    
    features = [
        data["bedrooms"],
        data["bathrooms"],
        data["sqft_living"],
        data["sqft_lot"],
        data["floors"],
        data["waterfront"],
        data["view"],
        data["condition"],
        data["sqft_above"],
        data["sqft_basement"],
        data["yr_built"],
        data["yr_renovated"]
    ]
    prediction = model.predict([features])[0]
    return jsonify({"predicted_price": prediction})

if __name__ == '__main__':
    app.run(debug=True)
