# Real Estate Price Prediction System

A machine learning-powered web application for estimating property values using Random Forest regression.

## Demo Video
<video width="640" height="360" controls>
  <source src="demo/realestateml_demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Key Features
- Property price prediction based on 12 architectural features
- React frontend with responsive design
- Flask API backend with trained ML model
- Interactive prediction visualization

## Installation and Setup

### Requirements
- Node.js v18+
- Python 3.9+
- Git

### Setup Instructions

1. **Clone the repository:**
```bash
git clone https://github.com/bnpm63/realestate-ml.git
cd realestate-ml

### Backend (Flask API)
python -m venv venv
source venv/bin/activate  
pip install -r requirements.txt
python app.py

### Frontend (Next.js)
cd house-price
npm install
npm run dev