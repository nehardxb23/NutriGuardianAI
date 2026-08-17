from pydantic import BaseModel


# ==========================
# AI Chatbot
# ==========================

class ChatRequest(BaseModel):
    user_id: int
    question: str


class ChatResponse(BaseModel):
    answer: str


# ==========================
# AI Diet Planner
# ==========================

class DietRequest(BaseModel):
    user_id: int
    age: int
    weight: float
    height: float
    goal: str
    diet_type: str


class DietResponse(BaseModel):
    meal_plan: str