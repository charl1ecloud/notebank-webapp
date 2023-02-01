from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

class NoteBase(BaseModel):
    title: str
    code: str
    note_type: str
    filename: str
    academic_year: str

class UserBase(BaseModel):
    email: EmailStr
    password: str
    username: str

class VoteBase(BaseModel):
    value: int

class Vote(VoteBase):
    note_id: int
    owner_id: int

    class Config:
        orm_mode = True

class UserOut(BaseModel):
    id: int
    email: EmailStr
    username: str
    created_at: datetime
    profile_pic_url: Optional[str]
    
    class Config:
        orm_mode = True


class Note(NoteBase):
    id: int
    uploaded_at: datetime
    owner_id: int
    owner: UserOut
    preview: str
    page_count: int
    
    class Config:
        orm_mode = True


class CommentBase(BaseModel):
    body: str
    

class CommentOut(CommentBase):
    id: int
    note_id: int
    owner_id: int
    timestamp: datetime
    owner: UserOut
    notes: Note

    class Config:
        orm_mode = True

class NotesDisplay(BaseModel):  
    Note: Note
    votes: int
    likes: int
    dislikes: int
    
    class Config:
        orm_mode = True

class NoteDisplay(BaseModel):
    Note: Note
    votes: int
    likes: int
    dislikes: int
    note_bytes: str
    comments: List[CommentOut]
    comments_count: int

    class Config:
        orm_mode = True

class UserDisplay(BaseModel):
    User: UserOut
    votes: Optional[List[Vote]]
    notes: Optional[List[NotesDisplay]]
    comments: Optional[List[CommentOut]]

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[str] = None


