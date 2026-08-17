from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.chat_history import ChatHistory

router = APIRouter(
    prefix="/chat-history",
    tags=["Chat History"]
)


@router.get("/{user_id}")
def get_chat_history(
    user_id: int,
    db: Session = Depends(get_db)
):
    try:
        history = (
            db.query(ChatHistory)
            .filter(ChatHistory.user_id == user_id)
            .order_by(ChatHistory.created_at.desc())
            .all()
        )

        return [
            {
                "id": chat.id,
                "user_id": chat.user_id,
                "question": chat.question,
                "answer": chat.answer,
                "created_at": chat.created_at
            }
            for chat in history
        ]

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )