from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import List, Optional

from sqlalchemy import func
from .. import models, schemas, oauth2
from ..database import get_db

router = APIRouter(
    prefix="/notes",
    tags=['Notes']
)

@router.get("/", response_model=List[schemas.NoteDisplay])
async def get_notes(db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user), limit: int = 10, skip: int = 0, search: Optional[str] = ""):
    notes = db.query(models.Note).filter(models.Note.code.contains(search)).limit(limit).offset(skip).all()
    return notes

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Note)
async def create_notes(note: schemas.NoteCreate, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    new_note = models.Note(owner_name=current_user.username, **note.dict())
    db.add(new_note)
    db.commit()
    db.refresh(new_note)

    return new_note

@router.get("/{id}", response_model=schemas.NoteDisplay)
async def get_note(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    note = db.query(models.Note).filter(models.Note.id == id).first()

    if not note:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"note with id: {id} was not found")

    return note