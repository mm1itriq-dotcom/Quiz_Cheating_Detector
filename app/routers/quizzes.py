from fastapi import APIRouter, status
from pydantic import BaseModel, UUID4
from app.database import engine
from app.models import quizzes
from sqlalchemy import select, insert
import uuid

router = APIRouter(prefix="/quizzes", tags=["Quizzes"])

class QuizCreate(BaseModel):
    title: str
    course_name: str

class QuizResponse(QuizCreate):
    id: UUID4

@router.get("/", response_model=list[QuizResponse])
def get_all_quizzes():
    with engine.connect() as conn:
        result = conn.execute(select(quizzes)).fetchall()
        return [dict(row._mapping) for row in result]

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=QuizResponse)
def create_quiz(quiz: QuizCreate):
    new_id = uuid.uuid4()
    with engine.connect() as conn:
        conn.execute(
            insert(quizzes).values(
                id=new_id,
                title=quiz.title,
                course_name=quiz.course_name
            )
        )
        conn.commit()
        return {**quiz.model_dump(), "id": new_id}

