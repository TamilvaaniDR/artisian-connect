from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
import secrets

from .. import models, schemas
from ..db import get_db

router = APIRouter()


@router.post("/login", response_model=schemas.TokenResponse)
def login(payload: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Placeholder: in real system compare bcrypt hash
    if not bcrypt.verify(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Placeholder token generation (replace with JWT later)
    token = secrets.token_urlsafe(32)
    return schemas.TokenResponse(access_token=token)
