import pandas as pd
from sklearn.model_selection import train_test_split

data = pd.read_csv("backend/disease/datasets/diabetes.csv")

print(data.head())

print(data.shape)
print(data.info())

# Separate features and target

X = data.drop("Outcome", axis=1)
y = data["Outcome"]

print(X.head())
print(y.head())
from sklearn.model_selection import train_test_split

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(X_train.shape)
print(X_test.shape)
from sklearn.linear_model import LogisticRegression

# Create model
model = LogisticRegression(max_iter=1000)

# Train model
model.fit(X_train, y_train)

print("Model trained successfully!")

from sklearn.metrics import accuracy_score

# Make predictions
y_pred = model.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)

print("Accuracy:", accuracy)

import joblib

# Save model
joblib.dump(model, "backend/disease/models/diabetes_model.pkl")

print("Model saved successfully!")