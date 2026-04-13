# Setup Guide – Anndata (AI & IoT Smart Agriculture System)

## Requirements
- Python 3.x
- Arduino IDE
- ESP32 microcontroller
- Internet connection

### Python Libraries
- numpy
- pandas
- (add others if used)

---

## Installation

1. Clone the repository:
git clone https://github.com/joshdoshboi/Anndata-FINAL-

2. Navigate to the project folder:
cd anndata

3. Install dependencies:
pip install -r requirements.txt

---

## Hardware Setup

### Components
- ESP32 microcontroller
- Soil moisture sensor
- Temperature & humidity sensor
- NPK sensor

### Steps
1. Open Arduino IDE
2. Install ESP32 board support:
   - Go to Board Manager
   - Search "ESP32" and install
3. Connect ESP32 via USB
4. Select:
   - Board: ESP32
   - Correct COM Port
5. Upload the sensor code to ESP32
6. Configure WiFi credentials in the code

---

## Running the System

1. Start the backend/server:
python app.py

2. Power the ESP32

3. ESP32 will:
- Collect sensor data
- Send data to backend/cloud

4. System processes data and generates alerts

---

## Output

- Irrigation recommendations
- Soil nutrient status (NPK)
- Crop stress alerts

---

## Testing

- Tested in real farm environments
- Sensors deployed in soil for live data collection
- Validated system outputs with real conditions


