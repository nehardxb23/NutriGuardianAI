from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from database import get_db
from models.user import User
from schemas.user_schema import UserCreate
from utils.security import hash_password, verify_password
from utils.jwt_handler import create_access_token, verify_token

router = APIRouter()

# JWT Security
security = HTTPBearer()

# ==========================
# Register API
# ==========================
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Create new user
    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        age=user.age,
        gender=user.gender,
        height=user.height,
        weight=user.weight
    )

    # Save to database
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user_id": new_user.id
    }


# ==========================
# Login API
# ==========================
@router.post("/login")
def login(
    email: str,
    password: str,
    db: Session = Depends(get_db)
):

    # Find user
    user = db.query(User).filter(User.email == email).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Verify password
    if not verify_password(password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect password"
        )

    # Create JWT Token
    access_token = create_access_token(
        data={"sub": user.email}
    )

    # Debug
    print("\n========== LOGIN ==========")
    print("User Email :", user.email)
    print("Generated Token :", access_token)
    print("===========================\n")

    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }


# ==========================
# Profile API (Protected)
# ==========================
@router.get("/profile")
def get_profile(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    # Extract token
    token = credentials.credentials

    print("\n========== PROFILE ==========")
    print("Received Token :", token)

    # Verify token
    email = verify_token(token)

    print("Decoded Email :", email)
    print("=============================\n")

    if email is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    # Find user
    user = db.query(User).filter(User.email == email).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "age": user.age,
        "gender": user.gender,
        "height": user.height,
        "weight": user.weight
    }