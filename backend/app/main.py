from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict,Field
from app.models import Word
from app.database import Base, engine, get_db

app = FastAPI()
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    word: str
    absurdity_level: int = Field(default=2, ge=0, le=4)

class GenerateResponse(BaseModel):
    word: str
    absurdity_level: int
    memory: str

class WordCreate(BaseModel):
    text: str
    meaning: str


class WordResponse(BaseModel):
    id: int
    text: str
    meaning: str

    model_config = ConfigDict(from_attributes=True)

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.post(
    "/api/words",
    response_model=WordResponse,
    status_code=201,
)
def create_word(
    payload: WordCreate,
    db: Session = Depends(get_db),
):
    existing = db.scalar(
        select(Word).where(Word.text == payload.text)
    )

    if existing:
        raise HTTPException(
            status_code=409,
            detail="Word already exists",
        )

    word = Word(
        text=payload.text,
        meaning=payload.meaning,
    )

    db.add(word)
    db.commit()
    db.refresh(word)

    return word

@app.get(
    "/api/words",
    response_model=list[WordResponse],
)
def list_words(
    db: Session = Depends(get_db),
):
    statement = select(Word).order_by(Word.id)
    return list(db.scalars(statement))

@app.post("/api/generate", response_model=GenerateResponse)
def generate(payload: GenerateRequest):
    return GenerateResponse(
        word = payload.word,
        absurdity_level = payload.absurdity_level,
        memory=(
            f"Level {payload.absurdity_level}: "
            f"Imagine a giant snake shouting: {payload.word}!"
        ),
    )

