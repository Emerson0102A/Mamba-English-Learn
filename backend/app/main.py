from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from app import models
from app.database import Base, engine

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

@app.get("/api/health")
def health():
    return {"status": "ok"}
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

