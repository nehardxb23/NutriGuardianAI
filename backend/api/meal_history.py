from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.meal_history import MealHistory

router = APIRouter(
    prefix="/meal-history",
    tags=["Meal History"]
)


@router.get("/{user_id}")
def get_meal_history(user_id: int, db: Session = Depends(get_db)):

    meals = (
        db.query(MealHistory)
        .filter(MealHistory.user_id == user_id)
        .order_by(MealHistory.created_at.desc())
        .all()
    )

    return meals