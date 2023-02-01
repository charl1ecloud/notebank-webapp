from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP

from .database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('now()'))
    username = Column(String, nullable=False)
    profile_pic_url = Column(String, default=None)
    notes = relationship('Note', back_populates='owner')
    comments = relationship('Comment', back_populates='owner')
    votes = relationship("Vote", back_populates="owner")

class Note(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    code = Column(String, nullable=False)
    note_type = Column(String, nullable=False)
    filename = Column(String, nullable=False)
    academic_year = Column(String, nullable=False)
    page_count = Column(Integer, nullable=False)
    preview= Column(String, nullable=False)
    uploaded_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('now()'))
    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))

    owner = relationship("User", back_populates='notes')
    comments = relationship("Comment", back_populates='notes')
    votes = relationship("Vote", back_populates="notes")

class Vote(Base):
    __tablename__ = "votes"
    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    note_id = Column(Integer, ForeignKey("notes.id", ondelete="CASCADE"), primary_key=True)
    value = Column(Integer, default=1)
    notes = relationship("Note", back_populates="votes")
    owner = relationship("User", back_populates="votes")


class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True)
    body = Column(String, default=None)
    timestamp = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    owner_id = Column(Integer, ForeignKey('users.id', ondelete="CASCADE"))
    note_id = Column(Integer, ForeignKey('notes.id', ondelete="CASCADE"))
    notes = relationship("Note", back_populates="comments")
    owner = relationship("User", back_populates="comments")

