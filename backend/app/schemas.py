from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

class NoteBase(BaseModel):
    title: str
    code: str
    language: str
    filename: str
    year: int


class NoteCreate(NoteBase):
    pass


class UserBase(BaseModel):
    email: EmailStr
    password: str
    username: str


class UserOut(BaseModel):
    id: int
    email: EmailStr
    username: str
    created_at: datetime

    class Config:
        orm_mode = True

class Note(NoteBase):
    id: int
    uploaded_at: datetime
    owner_name: str
    owner: UserOut

    class Config:
        orm_mode = True

class UserDisplay(BaseModel):
    username: str
    notes: Optional[List[Note]]
    email: EmailStr
    profile_pic_url: Optional[str]

    class Config:
        orm_mode = True

class CommentBase(BaseModel):
    rating: int
    review_text: Optional[str] = None
    note_id: int

class CommentDisplay(BaseModel):
    rating: int
    review_text: Optional[str] = None
    username: str
    timestamp: datetime

    class Config:
        orm_mode = True

class CommentOut(CommentBase):
    id: int
    owner_name: str
    timestamp: datetime

    class Config:
        orm_mode = True


class NoteDisplay(Note):
    comments: Optional[List[CommentOut]]

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[str] = None
