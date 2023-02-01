from fastapi import status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from .. import models, schemas, utils, oauth2
from ..database import get_db
from sqlalchemy import func, case

router = APIRouter(
    prefix="/users",
    tags=['Users']
)

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOut)
async def create_user(user: schemas.UserBase, db: Session = Depends(get_db)):

    # hash the password - user.password
    hashed_password = utils.hash(user.password)
    user.password = hashed_password

    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.get('/info', response_model=schemas.UserDisplay)
async def get_user_info(db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    notes = db.query(models.Note, func.count(models.Vote.note_id).label("votes"), (func.count(case([(models.Vote.value == 1, 1)], else_=None))).label("likes"), (func.count(case([(models.Vote.value == -1, 1)], else_=None))).label("dislikes")).join(models.Vote, models.Vote.note_id == models.Note.id, isouter=True).group_by(models.Note.id).filter(models.Note.owner_id == current_user.id).all()
    notes_display = [schemas.NotesDisplay(Note=note[0], votes=note[1], likes=note[2], dislikes=note[3]) for note in notes]
    return schemas.UserDisplay(User=current_user,notes=notes_display)

@router.get("/basicinfo", response_model=schemas.UserOut)
async def get_basic_user_info(db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    return current_user

@router.put("/email", response_model=schemas.UserOut)
async def update_email(email: str, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    user = db.query(models.User).filter(models.User.id == current_user.id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id: {current_user.id} does not exist")

    user.email = email
    db.commit()
    db.refresh(user)

    return user

@router.get('/{id}', response_model=schemas.UserOut)
async def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id: {id} does not exist")

    return user

