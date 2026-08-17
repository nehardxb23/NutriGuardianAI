from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from datetime import datetime
from database import Base


class MealHistory(Base):
    __tablename__ = "meal_history"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    age = Column(Integer)
    weight = Column(Float)
    height = Column(Float)

    goal = Column(String(100))
    diet_type = Column(String(100))

    meal_plan = Column(String(5000))

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )