import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import joblib


# Load dataset
data = pd.read_csv("backend/disease/datasets/heart.csv")

print(data.head())
print(data.shape)


# Separate input and output
X = data.drop("target", axis=1)
y = data["target"]


# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# Train model
model = LogisticRegression(max_iter=1000)

model.fit(X_train, y_train)


# Check accuracy
accuracy = model.score(X_test, y_test)

print("Heart Model Accuracy:", accuracy)


# Save model
joblib.dump(
    model,
    "backend/disease/models/heart_model.pkl"
)

print("Heart model saved successfully!")