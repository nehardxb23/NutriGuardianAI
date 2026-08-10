import joblib
import pandas as pd

# Load trained model
model = joblib.load("backend/disease/models/diabetes_model.pkl")

# Patient data with feature names
patient = pd.DataFrame({
    "Pregnancies": [2],
    "Glucose": [120],
    "BloodPressure": [70],
    "SkinThickness": [25],
    "Insulin": [100],
    "BMI": [28.5],
    "DiabetesPedigreeFunction": [0.5],
    "Age": [30]
})

# Prediction
prediction = model.predict(patient)

if prediction[0] == 1:
    print("Diabetes Risk: Positive")
else:
    print("Diabetes Risk: Negative")