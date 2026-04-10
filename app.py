from flask import Flask, request, jsonify
from flask_cors import CORS  # <--- NEW IMPORT
import random

app = Flask(__name__)
CORS(app)  # <--- THIS ALLOWS YOUR WEBSITE TO CONNECT

# Storage for the latest data
latest_data = {
    "temperature": 0,
    "humidity": 0,
    "moisture": 0,
    "lat": 0,
    "lng": 0
}

@app.route('/update_sensor_data', methods=['POST'])
def receive_data():
    global latest_data
    data = request.json
    print(f"📡 RECEIVED: {data}")
    if data:
        latest_data = data
    return "Data Received", 200

@app.route('/get_dashboard_data', methods=['GET'])
def send_to_frontend():
    # Create a copy of the real data
    dashboard_data = latest_data.copy()
    
    # Simulate NPK values (since we don't have sensors for these yet)
    dashboard_data["nitrogen"] = random.randint(40, 60)
    dashboard_data["phosphorus"] = random.randint(20, 40)
    dashboard_data["potassium"] = random.randint(15, 30)
    
    # AI Logic Recommendation
    if latest_data['moisture'] > 80:
        dashboard_data["prediction"] = "Rice"
        dashboard_data["confidence"] = 94.5
    elif latest_data['temperature'] > 28:
        dashboard_data["prediction"] = "Maize"
        dashboard_data["confidence"] = 88.0
    else:
        dashboard_data["prediction"] = "Wheat"
        dashboard_data["confidence"] = 85.0

    return jsonify(dashboard_data)

if __name__ == '__main__':
    print("🚀 Annadata Server Starting...")
    app.run(host='0.0.0.0', port=5000, debug=True)