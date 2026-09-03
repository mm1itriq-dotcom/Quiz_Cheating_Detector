from fastapi import APIRouter, HTTPException, status, Query
from pydantic import BaseModel, UUID4, Field
from app.database import engine
from app.models import students
from sqlalchemy import select, insert, delete
import uuid

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)

class StudentCreate(BaseModel):
    first_name: str
    last_name: str
    email: str = Field(..., pattern=r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", description="Must be a valid email address")

class StudentResponse(StudentCreate):
    id: UUID4

@router.get("/", response_model=list[StudentResponse])
def get_all_students(limit: int = Query(10, description="Limit the number of students")):
    with engine.connect() as conn:
        result = conn.execute(select(students).limit(limit)).fetchall()
        return [dict(row._mapping) for row in result]

@router.get("/{student_id}", response_model=StudentResponse)
def get_student(student_id: UUID4):
    with engine.connect() as conn:
        result = conn.execute(select(students).where(students.c.id == student_id)).first()
        if not result:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
        return dict(result._mapping)

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=StudentResponse)
def create_student(student: StudentCreate):
    new_id = uuid.uuid4()
    with engine.connect() as conn:
        existing = conn.execute(select(students).where(students.c.email == student.email)).first()
        if existing:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
            
        conn.execute(
            insert(students).values(
                id=new_id,
                first_name=student.first_name,
                last_name=student.last_name,
                email=student.email
            )
        )
        conn.commit()
        return {**student.model_dump(), "id": new_id}

@router.delete("/{student_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_student(student_id: UUID4):
    with engine.connect() as conn:
        result = conn.execute(delete(students).where(students.c.id == student_id))
        conn.commit()
        if result.rowcount == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
        return None
