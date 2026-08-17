from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from ai.chatbot import ask_ai
from schemas.ai_schema import ChatRequest, ChatResponse
from models.chat_history import ChatHistory


router = APIRouter(
    prefix="/chatbot",
    tags=["AI Chatbot"]
)


@router.post("/", response_model=ChatResponse)
def chatbot(
    request: ChatRequest,
    db: Session = Depends(get_db)
):
    # Generate AI answer
    answer = ask_ai(request.question)

    # Save chat history
    chat = ChatHistory(
        user_id=request.user_id,
        question=request.question,
        answer=answer
    )

    db.add(chat)
    db.commit()
    db.refresh(chat)

    return ChatResponse(
        answer=answer
    )