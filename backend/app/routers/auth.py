from fastapi import APIRouter, Depends, status, HTTPException, Response, Request
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .. import database, schemas, models, utils, oauth2
from typing import Optional

router = APIRouter(tags=['Authentication'])


@router.post('/login', response_model=schemas.Token)
def login(response: Response, user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):

    user = db.query(models.User).filter(
        models.User.email == user_credentials.username).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")

    if not utils.verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")

    access_token = oauth2.create_access_token(data={"user_id": user.id})
    refresh_token = oauth2.create_refresh_token(data={"user_id": user.id})
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True)

    return {"access_token": access_token, "token_type": "bearer"}

@router.get('/refresh', response_model=schemas.Token)
def refresh_token(request: Request, db: Session = Depends(database.get_db)):
    refresh_token: str = request.cookies.get("refresh_token")
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                          detail=f"Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})
    token = oauth2.verify_refresh_token(refresh_token, credentials_exception)
    user_id = token.id
    
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail='The user belonging to this token no logger exist')
    access_token = oauth2.create_access_token(data={"user_id": user.id})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get('/logout')
def logout(response: Response, current_user: int = Depends(oauth2.get_current_user)):
    response.delete_cookie("refresh_token")
    return {'status':'success'}
