from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from schemas.diet_schema import DietRequest
from ai.diet_planner import generate_diet
from models.meal_history import MealHistory


router = APIRouter(
    prefix="/diet-planner",
    tags=["AI Diet Planner"]
)


@router.post("/")
def diet_planner(
    request: DietRequest,
    db: Session = Depends(get_db)
):

    try:

        result = generate_diet(
            request.age,
            request.weight,
            request.height,
            request.goal,
            request.diet_type,
            request.obesity,
            request.hypertension,
            request.diabetes,
            request.heart_disease
        )


        meal = MealHistory(
            user_id=request.user_id,
            age=request.age,
            weight=request.weight,
            height=request.height,
            goal=request.goal,
            diet_type=request.diet_type,
            meal_plan=result
        )


        db.add(meal)

        db.commit()

        db.refresh(meal)


        return {
            "meal_plan": result
        }


    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )