from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base

class Word(Base):
    __tablename__ = "words"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    text: Mapped[str] = mapped_column(
        String(40),
        unique=True,
    )
    meaning: Mapped[str] = mapped_column(
        String(200),
    )