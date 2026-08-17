from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db

from ai.agent import run_agent

from schemas.ai_schema import ChatRequest, ChatResponse

from models.tracking import ProgressTracking
from models.meal_history import MealHistory
from models.chat_history import ChatHistory


router = APIRouter(
    prefix="/agent",
    tags=["Agentic AI"]
)


@router.post("/", response_model=ChatResponse)
def agent(
    request: ChatRequest,
    db: Session = Depends(get_db)
):
    try:

        # ==========================================
        # 1. Get user's tracking history
        # ==========================================

        tracking_data = (
            db.query(ProgressTracking)
            .filter(
                ProgressTracking.user_id == request.user_id
            )
            .order_by(
                ProgressTracking.record_date.asc()
            )
            .all()
        )


        # ==========================================
        # 2. Get user's meal history
        # ==========================================

        meal_history = (
            db.query(MealHistory)
            .filter(
                MealHistory.user_id == request.user_id
            )
            .order_by(
                MealHistory.created_at.desc()
            )
            .all()
        )


        # ==========================================
        # 3. Run Agentic AI
        # ==========================================

        answer = run_agent(
            request.question,
            tracking_data,
            meal_history
        )


        # ==========================================
        # 4. Save Agent conversation
        # ==========================================

        chat = ChatHistory(
            user_id=request.user_id,
            question=request.question,
            answer=answer
        )

        db.add(chat)
        db.commit()
        db.refresh(chat)


        # ==========================================
        # 5. Return AI response
        # ==========================================

        return ChatResponse(
            answer=answer
        )


    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )