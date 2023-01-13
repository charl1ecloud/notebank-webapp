from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter, File, UploadFile, Form, BackgroundTasks
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
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
        model = schemas.NoteCreate.parse_raw(data)
    except ValidationError as e:
        raise HTTPException(
            detail=jsonable_encoder(e.errors()),
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )

    return model

@router.get("/", response_model=List[schemas.NoteDisplay])
async def get_notes(db: Session = Depends(get_db), limit: int = 10, skip: int = 0, search: Optional[str] = ""):
    notes = db.query(models.Note).filter(models.Note.code == search).limit(limit).offset(skip).all()
    return notes

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Note)
async def create_notes(note: schemas.NoteCreate = Depends(checker), db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user),file: UploadFile = File(...), s3 = Depends(s3_instance)):
    pdf_bytes = await file.read()
    preview_url = generate_preview(pdf_bytes, s3, file.filename) 
    new_note = models.Note(owner_name=current_user.username, preview=preview_url, **note.dict())
    db.add(new_note)
    db.commit()
    db.refresh(new_note)
    return new_note 

@router.get("/{id}")
async def get_note(background_tasks: BackgroundTasks, id: int, db: Session = Depends(get_db), s3 = Depends(s3_instance)):
    note = db.query(models.Note).filter(models.Note.id == id).first()
    if not note:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"note with id: {id} was not found")
    obj = s3.Object("notebank", note.filename)
    f = io.BytesIO()
    obj.download_fileobj(f)
    background_tasks.add_task(f.close)
    headers = {'Content-Disposition': 'inline; filename="out.pdf"'}
    return Response(f.getvalue(), headers=headers, media_type='application/pdf')