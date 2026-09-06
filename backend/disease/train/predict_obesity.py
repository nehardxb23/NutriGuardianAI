import joblib
import pandas as pd

# Load model
model = joblib.load(
    "backend/disease/models/obesity_model.pkl"
)

# Load encoders
encoders = joblib.load(
    "backend/disease/models/obesity_encoders.pkl"
)


# Sample patient data
patient = {
    "Gender": "Male",
    "Age": 30,
    "Height": 1.75,
    "Weight": 90,
    "family_history_with_overweight": "yes",
    "FAVC": "yes",
    "FCVC": 2,
    "NCP": 3,
    "CAEC": "Sometimes",
    "SMOKE": "no",
    "CH2O": 2,
    "SCC": "no",
    "FAF": 1,
    "TUE": 1,
    "CALC": "Sometimes",
    "MTRANS": "Public_Transportation"
}


df = pd.DataFrame([patient])


# Encode text columns
for column, encoder in encoders.items():
    if column in df.columns:
        df[column] = encoder.transform(df[column])


prediction = model.predict(df)

# Convert prediction number back to label
target_encoder = encoders["NObeyesdad"]

result = target_encoder.inverse_transform(prediction)

print("Obesity Level Prediction:", result[0])