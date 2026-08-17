from sqlalchemy import Column, Integer, Float, Date, ForeignKey
from database import Base


class ProgressTracking(Base):
    __tablename__ = "progress_tracking"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    weight = Column(Float, nullable=False)
    calories = Column(Integer, nullable=False)
    record_date = Column(Date, nullable=False)