import base64
from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter, File, UploadFile, Form, BackgroundTasks
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from sqlalchemy import func, case
from typing import List, Optional
from .. import models, schemas, oauth2
from ..database import get_db
from ..utils import s3_instance, generate_preview
from pydantic import ValidationError
import io

router = APIRouter(
    prefix="/notes",
    tags=['Notes']
)

def checker(data: str = Form(...)):
    try:
        model = schemas.NoteBase.parse_raw(data)
    except ValidationError as e:
        raise HTTPException(
            detail=jsonable_encoder(e.errors()),
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )

    return model

@router.get("/", response_model=List[schemas.NotesDisplay])
async def get_notes(db: Session = Depends(get_db), limit: int = 10, skip: int = 0, search: Optional[str] = ""):
    notes = db.query(models.Note, func.count(models.Vote.note_id).label("votes"), (func.count(case([(models.Vote.value == 1, 1)], else_=None))).label("likes"), (func.count(case([(models.Vote.value == -1, 1)], else_=None))).label("dislikes")).join(models.Vote, models.Vote.note_id == models.Note.id, isouter=True).group_by(models.Note.id).filter(models.Note.code == search).limit(limit).offset(skip).all()
    return notes

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Note)
async def create_notes(note: schemas.NoteBase = Depends(checker), db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user),file: UploadFile = File(...), s3 = Depends(s3_instance)):
    pdf_bytes = await file.read()
    preview_url, page_count = generate_preview(pdf_bytes, s3, file.filename) 
    new_note = models.Note(page_count=page_count, owner_id=current_user.id, preview=preview_url, **note.dict())
    db.add(new_note)
    db.commit()
    db.refresh(new_note)
    return new_note 

@router.get("/{id}", status_code=status.HTTP_200_OK, response_model=schemas.NoteDisplay)
async def get_note(background_tasks: BackgroundTasks, id: int, db: Session = Depends(get_db), s3 = Depends(s3_instance)):
    note = db.query(models.Note, (func.count(models.Vote.note_id)).label("votes"), (func.count(case([(models.Vote.value == 1, 1)], else_=None))).label("likes"), (func.count(case([(models.Vote.value == -1, 1)], else_=None))).label("dislikes"), (func.count(models.Comment.id)).label("comments_count")).join(models.Vote, models.Vote.note_id == models.Note.id, isouter=True).join(models.Comment, models.Comment.note_id == models.Note.id, isouter=True).filter(models.Note.id == id).group_by(models.Note.id).first()
    if not note:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"note with id: {id} was not found")
    comments = db.query(models.Comment).filter(models.Comment.note_id == note[0].id).all()
    obj = s3.Object("notebank", note[0].filename)
    f = io.BytesIO()
    obj.download_fileobj(f)
    background_tasks.add_task(f.close)
    return schemas.NoteDisplay(Note=note[0], comments=comments, votes=note[1], likes=note[2], dislikes=note[3], comments_count=len(comments), note_bytes=base64.b64encode(f.getvalue()).decode("utf-8"))