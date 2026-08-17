from pydantic import BaseModel


class DietRequest(BaseModel):

    user_id: int

    age: int
    weight: float
    height: float

    goal: str
    diet_type: str

    # Disease prediction results
    obesity: str = "No"
    hypertension: str = "No"
    diabetes: str = "No"
    heart_disease: str = "No"