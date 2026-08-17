from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine
from models.user import Base

# Import models so SQLAlchemy creates their tables
import models.tracking
import models.meal_history
import models.chat_history

# Routers
from auth.auth import router as auth_router
from tracking.tracking import router as tracking_router
from api.chatbot import router as chatbot_router
from api.diet_planner import router as diet_router
from api.chat_history import router as chat_history_router
from api.translation import router as translation_router
from api.agent import router as agent_router


# Create all database tables
Base.metadata.create_all(bind=engine)


# Create FastAPI application
app = FastAPI(
    title="NutriGuardian AI",
    description="AI-powered nutrition and health assistant",
    version="1.0.0"
)


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register routers
app.include_router(auth_router)
app.include_router(tracking_router)
app.include_router(chatbot_router)
app.include_router(diet_router)
app.include_router(chat_history_router)
app.include_router(translation_router)
app.include_router(agent_router)


# Home route
@app.get("/")
def home():
    return {
        "message": "Welcome to NutriGuardian AI"
    }