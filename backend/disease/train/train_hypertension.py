import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
import joblib


# Load dataset
data = pd.read_csv(
    "backend/disease/datasets/hypertension_dataset.csv"
)

print(data.head())
print(data.shape)


# Convert text columns into numbers
encoders = {}

for column in data.columns:
    if data[column].dtype == "str" or data[column].dtype == "object":
        encoder = LabelEncoder()
        data[column] = encoder.fit_transform(data[column])
        encoders[column] = encoder


# Split input and output

X = data.drop("Has_Hypertension", axis=1)

y = data["Has_Hypertension"]


# Train test split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# Train model

model = LogisticRegression(max_iter=1000)

model.fit(
    X_train,
    y_train
)


# Accuracy

accuracy = model.score(
    X_test,
    y_test
)

print("Hypertension Model Accuracy:", accuracy)


# Save model

joblib.dump(
    model,
    "backend/disease/models/hypertension_model.pkl"
)

joblib.dump(
    encoders,
    "backend/disease/models/hypertension_encoders.pkl"
)

print("Hypertension model saved successfully!")