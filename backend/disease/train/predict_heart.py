import joblib
import pandas as pd

# Load model
model = joblib.load(
    "backend/disease/models/heart_model.pkl"
)

# Test patient data
data = {
    "age": 55,
    "sex": 1,
    "cp": 2,
    "trestbps": 130,
    "chol": 240,
    "fbs": 0,
    "restecg": 1,
    "thalach": 150,
    "exang": 0,
    "oldpeak": 1.2,
    "slope": 2,
    "ca": 0,
    "thal": 2
}

# Convert to dataframe
df = pd.DataFrame([data])

# Predict
prediction = model.predict(df)

if prediction[0] == 1:
    print("Heart Disease Risk: Positive")
else:
    print("Heart Disease Risk: Negative")