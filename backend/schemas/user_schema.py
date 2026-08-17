from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    age: int
    gender: str
    height: float
    weight: float


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    age: int
    gender: str
    height: float
    weight: float

    class Config:
        from_attributes = True