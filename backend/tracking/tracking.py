from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.tracking import ProgressTracking
from schemas.tracking_schema import TrackingCreate

router = APIRouter()


# ==========================
# Add Tracking API
# ==========================
@router.post("/tracking")
def add_tracking(data: TrackingCreate, db: Session = Depends(get_db)):

    new_tracking = ProgressTracking(
        user_id=data.user_id,
        weight=data.weight,
        calories=data.calories,
        record_date=data.record_date
    )

    db.add(new_tracking)
    db.commit()
    db.refresh(new_tracking)

    return {
        "message": "Tracking data added successfully",
        "tracking_id": new_tracking.id
    }


# ==========================
# Get Tracking History API
# ==========================
@router.get("/tracking/{user_id}")
def get_tracking(user_id: int, db: Session = Depends(get_db)):

    records = (
        db.query(ProgressTracking)
        .filter(ProgressTracking.user_id == user_id)
        .all()
    )

    return records


# ==========================
# Dashboard API
# ==========================
@router.get("/dashboard/{user_id}")
def dashboard(user_id: int, db: Session = Depends(get_db)):

    latest_record = (
        db.query(ProgressTracking)
        .filter(ProgressTracking.user_id == user_id)
        .order_by(ProgressTracking.record_date.desc())
        .first()
    )

    if latest_record is None:
        return {
            "message": "No tracking data found"
        }

    total_records = (
        db.query(ProgressTracking)
        .filter(ProgressTracking.user_id == user_id)
        .count()
    )

    return {
        "current_weight": latest_record.weight,
        "latest_calories": latest_record.calories,
        "total_records": total_records
    }
# ==========================
# Weight History API
# ==========================
@router.get("/weight-history/{user_id}")
def weight_history(user_id: int, db: Session = Depends(get_db)):

    records = (
        db.query(ProgressTracking)
        .filter(ProgressTracking.user_id == user_id)
        .order_by(ProgressTracking.record_date)
        .all()
    )

    return [
        {
            "record_date": record.record_date,
            "weight": record.weight
        }
        for record in records
    ]
# ==========================
# Calories History API
# ==========================
@router.get("/calories-history/{user_id}")
def calories_history(user_id: int, db: Session = Depends(get_db)):

    records = (
        db.query(ProgressTracking)
        .filter(ProgressTracking.user_id == user_id)
        .order_by(ProgressTracking.record_date)
        .all()
    )

    return [
        {
            "record_date": record.record_date,
            "calories": record.calories
        }
        for record in records
    ]
# ==========================
# Sustainability Score API
# ==========================
@router.get("/sustainability-score/{user_id}")
def sustainability_score(user_id: int, db: Session = Depends(get_db)):

    records = (
        db.query(ProgressTracking)
        .filter(ProgressTracking.user_id == user_id)
        .all()
    )

    if not records:
        return {
            "message": "No tracking data found"
        }

    avg_calories = sum(record.calories for record in records) / len(records)

    if avg_calories <= 1800:
        score = 95
    elif avg_calories <= 2200:
        score = 80
    else:
        score = 60

    return {
        "user_id": user_id,
        "average_calories": round(avg_calories, 2),
        "sustainability_score": score
    }