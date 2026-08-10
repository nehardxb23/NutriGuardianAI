from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
import mysql.connector

app = FastAPI()

# -----------------------------
# CORS
# -----------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# MySQL Database Connection
# -----------------------------

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        database="nutriguardian"
    )


# -----------------------------
# Save Prediction
# -----------------------------

def save_prediction(disease, prediction, risk):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        query = """
        INSERT INTO prediction_history
        (user_id, disease, prediction, risk)
        VALUES (%s, %s, %s, %s)
        """

        values = (
            None,
            disease,
            prediction,
            risk
        )

        cursor.execute(query, values)

        connection.commit()

        cursor.close()
        connection.close()

        print("Prediction saved to database.")

    except Exception as error:
        print("Database error:", error)


# -----------------------------
# Load ML Models
# -----------------------------

diabetes_model = joblib.load(
    "backend/disease/models/diabetes_model.pkl"
)

heart_model = joblib.load(
    "backend/disease/models/heart_model.pkl"
)

hypertension_model = joblib.load(
    "backend/disease/models/hypertension_model.pkl"
)

hypertension_encoders = joblib.load(
    "backend/disease/models/hypertension_encoders.pkl"
)

obesity_model = joblib.load(
    "backend/disease/models/obesity_model.pkl"
)

obesity_encoders = joblib.load(
    "backend/disease/models/obesity_encoders.pkl"
)


# -----------------------------
# Home
# -----------------------------

@app.get("/")
def home():
    return {
        "message": "NutriGuardianAI Backend Running"
    }


# -----------------------------
# Diabetes Prediction
# -----------------------------

@app.post("/predict/diabetes")
def predict_diabetes(data: dict):

    patient = pd.DataFrame([data])

    prediction = diabetes_model.predict(patient)

    if prediction[0] == 1:
        result = "Diabetes Risk: Positive"
        risk = "High"
    else:
        result = "Diabetes Risk: Negative"
        risk = "Low"

    save_prediction(
        "Diabetes",
        result,
        risk
    )

    return {
        "prediction": result
    }


# -----------------------------
# Heart Disease Prediction
# -----------------------------

@app.post("/predict/heart")
def predict_heart(data: dict):

    patient = pd.DataFrame([data])

    prediction = heart_model.predict(patient)

    if prediction[0] == 1:
        result = "Heart Disease Risk: Positive"
        risk = "High"
    else:
        result = "Heart Disease Risk: Negative"
        risk = "Low"

    save_prediction(
        "Heart Disease",
        result,
        risk
    )

    return {
        "prediction": result
    }


# -----------------------------
# Hypertension Prediction
# -----------------------------

@app.post("/predict/hypertension")
def predict_hypertension(data: dict):

    patient = pd.DataFrame([data])

    for column, encoder in hypertension_encoders.items():

        if column in patient.columns:

            patient[column] = encoder.transform(
                patient[column]
            )

    prediction = hypertension_model.predict(patient)

    if prediction[0] == 1:
        result = "Hypertension Risk: Positive"
        risk = "High"
    else:
        result = "Hypertension Risk: Negative"
        risk = "Low"

    save_prediction(
        "Hypertension",
        result,
        risk
    )

    return {
        "prediction": result
    }


# -----------------------------
# Obesity Prediction
# -----------------------------

@app.post("/predict/obesity")
def predict_obesity(data: dict):

    patient = pd.DataFrame([data])

    for column, encoder in obesity_encoders.items():

        if column in patient.columns:

            patient[column] = encoder.transform(
                patient[column]
            )

    prediction = obesity_model.predict(patient)

    result = obesity_encoders[
        "NObeyesdad"
    ].inverse_transform(prediction)

    obesity_result = f"Obesity Level: {result[0]}"

    # Treat higher obesity categories as higher risk
    if result[0] in [
        "Obesity_Type_I",
        "Obesity_Type_II",
        "Obesity_Type_III"
    ]:
        risk = "High"
    elif result[0] == "Overweight_Level_I" or result[0] == "Overweight_Level_II":
        risk = "Medium"
    else:
        risk = "Low"

    save_prediction(
        "Obesity",
        obesity_result,
        risk
    )

    return {
        "prediction": obesity_result
    }