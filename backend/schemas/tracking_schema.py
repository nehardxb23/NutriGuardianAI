from pydantic import BaseModel
from datetime import date


class TrackingCreate(BaseModel):
    user_id: int
    weight: float
    calories: int
    record_date: date


class TrackingResponse(BaseModel):
    id: int
    user_id: int
    weight: float
    calories: int
    record_date: date

    class Config:
        from_attributes = True