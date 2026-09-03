from pydantic import BaseModel, UUID4
from datetime import datetime
from typing import Optional

class SubmissionCreate(BaseModel):
    student_id: UUID4
    quiz_id: UUID4
    question_id: str
    answer: str
    is_correct: bool
    time_taken_seconds: float

class CheatingFlagCreate(BaseModel):
    student_id: UUID4
    quiz_id: UUID4
    rule_triggered: str
    severity_score: int
    description: str
