from fastapi import status, Depends, APIRouter
from sqlalchemy.orm import Session
from datetime import datetime
from .. import schemas, database, models, oauth2


router = APIRouter(
    prefix="/comment",
    tags=['Comment']
)


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.CommentOut)
async def create_comment(comment: schemas.CommentBase, db: Session = Depends(database.get_db), current_user: int = Depends(oauth2.get_current_user)):
    new_comment = models.Comment(**comment.dict(),timestamp=datetime.now(),owner_name =current_user.username)
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment

@router.get("/all/{note_id}", status_code=status.HTTP_200_OK, response_model=schemas.CommentDisplay)
async def get_comments_for_post(note_id: int, db: Session = Depends(database.get_db)):
    comments = db.query(models.Comment).filter(models.Comment.note_id == note_id).all()
    return comments
   

