import pandas as pd
import joblib
import os

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score


# Load dataset
data = pd.read_csv(
    "backend/disease/datasets/obesity.csv"
)

print(data.head())
print(data.shape)


# Encode text columns
encoders = {}

for column in data.select_dtypes(include="object").columns:
    encoder = LabelEncoder()
    data[column] = encoder.fit_transform(data[column])
    encoders[column] = encoder


# Separate input and output

X = data.drop("NObeyesdad", axis=1)

y = data["NObeyesdad"]


# Split data

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

prediction = model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    prediction
)

print("Obesity Model Accuracy:", accuracy)


# Create model folder if not exists

os.makedirs(
    "backend/disease/models",
    exist_ok=True
)


# Save model

joblib.dump(
    model,
    "backend/disease/models/obesity_model.pkl"
)


# Save encoders

joblib.dump(
    encoders,
    "backend/disease/models/obesity_encoders.pkl"
)


print("Obesity model saved successfully!")