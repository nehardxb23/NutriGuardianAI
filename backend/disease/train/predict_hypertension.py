import joblib
import pandas as pd


model = joblib.load(
    "backend/disease/models/hypertension_model.pkl"
)

encoders = joblib.load(
    "backend/disease/models/hypertension_encoders.pkl"
)


data = {
    "Age": 55,
    "Salt_Intake": 8,
    "Stress_Score": 7,
    "BP_History": "Hypertension",
    "Sleep_Duration": 6,
    "BMI": 29,
    "Medication": "Other",
    "Family_History": "Yes",
    "Exercise_Level": "Low",
    "Smoking_Status": "Non-Smoker"
}

df = pd.DataFrame([data])


for column, encoder in encoders.items():
    if column in df.columns:
        df[column] = encoder.transform(df[column])


prediction = model.predict(df)


if prediction[0] == 1:
    print("Hypertension Risk: Positive")
else:
    print("Hypertension Risk: Negative")