import uuid
from sqlalchemy import Table, Column, Integer, String, Float, Boolean, DateTime, ForeignKey, func, Uuid
from app.database import metadata

students = Table(
    "students", metadata,
    Column("id", Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4),
    Column("first_name", String, nullable=False),
    Column("last_name", String, nullable=False),
    Column("email", String, nullable=False, unique=True)
)

quizzes = Table(
    "quizzes", metadata,
    Column("id", Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4),
    Column("title", String, nullable=False),
    Column("course_name", String, nullable=False)
)

submissions = Table(
    "submissions", metadata,
    Column("id", Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4),
    Column("student_id", Uuid(as_uuid=True), ForeignKey("students.id"), nullable=False),
    Column("quiz_id", Uuid(as_uuid=True), ForeignKey("quizzes.id"), nullable=False),
    Column("question_id", String, nullable=False),
    Column("answer", String, nullable=False),
    Column("is_correct", Boolean, nullable=False),
    Column("time_taken_seconds", Float, nullable=False),
    Column("timestamp", DateTime, default=func.now(), nullable=False)
)

cheating_flags = Table(
    "cheating_flags", metadata,
    Column("id", Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4),
    Column("student_id", Uuid(as_uuid=True), ForeignKey("students.id"), nullable=False),
    Column("quiz_id", Uuid(as_uuid=True), ForeignKey("quizzes.id"), nullable=False),
    Column("rule_triggered", String, nullable=False),
    Column("severity_score", Integer, nullable=False),
    Column("description", String, nullable=False),
    Column("timestamp", DateTime, default=func.now(), nullable=False)
)

