from fastapi import status, Depends, APIRouter
from sqlalchemy.orm import Session
from datetime import datetime
from .. import schemas, database, models, oauth2

router = APIRouter(
    prefix="/vote",
    tags=['Vote']
)

@router.post("/like", status_code=status.HTTP_201_CREATED)
async def like_note(note_id: int, db: Session = Depends(database.get_db), current_user: int = Depends(oauth2.get_current_user)):
    existing_vote = db.query(models.Vote).filter(models.Note.id==note_id, models.User.id==current_user.id).first()
    if existing_vote:
        db.delete(existing_vote)
        db.commit()
        return {"message": "unliked"}
    else:
        new_vote = models.Vote(owner_id =current_user.id, note_id=note_id, value=1)
        db.add(new_vote)
        db.commit()
        db.refresh(new_vote)
        return new_vote

@router.post("/dislike", status_code=status.HTTP_201_CREATED)
async def dislike_note(note_id: int, db: Session = Depends(database.get_db), current_user: int = Depends(oauth2.get_current_user)):
    existing_vote = db.query(models.Vote).filter(models.Note.id==note_id, models.User.id==current_user.id).first()
    if existing_vote:
        db.delete(existing_vote)
        db.commit()
        return {"message": "undisliked"}
    else:
        new_vote = models.Vote(owner_id =current_user.id, note_id=note_id, value=-1)
        db.add(new_vote)
        db.commit()
        db.refresh(new_vote)
        return new_vote

@router.get("/post/{note_id}", status_code=status.HTTP_200_OK, response_model=schemas.Vote)
async def get_votes_for_post(note_id: int, db: Session = Depends(database.get_db)):
    votes = db.query(models.Vote).filter(models.Vote.note_id == note_id).all()
    return votes

@router.get("/user/{user_id}", status_code=status.HTTP_200_OK, response_model=schemas.Vote)
async def get_votes_for_user(user_id: int, db: Session = Depends(database.get_db)):
    votes = db.query(models.Vote).filter(models.Vote.owner_id == user_id).all()
    return votes
