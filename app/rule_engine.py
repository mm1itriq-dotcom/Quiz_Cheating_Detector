import uuid
from app.database import engine
from app.models import submissions
from app.schemas import SubmissionCreate, CheatingFlagCreate
from sqlalchemy import select

def evaluate_submission(sub: SubmissionCreate) -> list[CheatingFlagCreate]:
    flags = []
    
    # Rule 1: Too Fast (under 2 seconds)
    if sub.time_taken_seconds < 2.0:
        flags.append(CheatingFlagCreate(
            student_id=sub.student_id,
            quiz_id=sub.quiz_id,
            rule_triggered="FAST_ANSWER",
            severity_score=80,
            description=f"Answered in {sub.time_taken_seconds}s (too fast to read)"
        ))

    # Rule 2: Collusion
    # Check if another student gave the exact same wrong answer for this question.
    if not sub.is_correct:
        with engine.connect() as conn:
            query = select(submissions).where(
                submissions.c.quiz_id == sub.quiz_id,
                submissions.c.question_id == sub.question_id,
                submissions.c.answer == sub.answer,
                submissions.c.student_id != sub.student_id
            ).limit(1)
            
            collusion_match = conn.execute(query).first()
            if collusion_match:
                flags.append(CheatingFlagCreate(
                    student_id=sub.student_id,
                    quiz_id=sub.quiz_id,
                    rule_triggered="COLLUSION",
                    severity_score=100,
                    description=f"Same wrong answer as another student (Collusion suspected)"
                ))
    
    # Rule 3: Speed Anomaly (much faster than rolling average)
    with engine.connect() as conn:
        query = select(submissions.c.time_taken_seconds).where(
            submissions.c.student_id == sub.student_id,
            submissions.c.quiz_id == sub.quiz_id
        )
        history = conn.execute(query).fetchall()
        
        # Only check anomaly if we have at least 3 previous answers to establish a baseline
        if len(history) >= 3:
            avg_time = sum(row[0] for row in history) / len(history)
            # If they answer 70% faster than their own average
            if sub.time_taken_seconds < (avg_time * 0.3): 
                flags.append(CheatingFlagCreate(
                    student_id=sub.student_id,
                    quiz_id=sub.quiz_id,
                    rule_triggered="SPEED_ANOMALY",
                    severity_score=60,
                    description=f"Answered in {sub.time_taken_seconds}s, but normal average is {avg_time:.1f}s"
                ))

    return flags
