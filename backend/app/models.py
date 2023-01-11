from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP

from .database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('now()'))
    username = Column(String, nullable=False, unique=True)
    profile_pic_url = Column(String, default=None)
    items = relationship('Note', back_populates='owner')

class Note(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    code = Column(String, nullable=False)
    language = Column(String, nullable=False)
    filename = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    uploaded_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('now()'))
    owner_name = Column(String, ForeignKey(
        "users.username", ondelete="CASCADE"), nullable=False)

    owner = relationship("User", back_populates='items')
    review = relationship("Comment", back_populates='doc')

class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    rating = Column(Integer, nullable=False)
    review_text = Column(String, default=None)
    timestamp = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    owner_name = Column(String, ForeignKey(
        "users.username", ondelete="CASCADE"), nullable=False)
    note_id = Column(Integer, ForeignKey('notes.id', ondelete="CASCADE"))
    doc = relationship("Note", back_populates="review")

