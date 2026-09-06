from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.schemas import SubmissionCreate
from app.rule_engine import evaluate_submission
from app.database import engine
from app.models import submissions, cheating_flags, students, quizzes
from sqlalchemy import select
from sqlalchemy import insert
import json
import uuid

router = APIRouter(tags=["Stream"])

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)

manager = ConnectionManager()

@router.websocket("/ws/stream")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            
            sub = SubmissionCreate(**payload)
            
            sub_id = uuid.uuid4()
            with engine.connect() as conn:
                conn.execute(
                    insert(submissions).values(
                        id=sub_id,
                        student_id=sub.student_id,
                        quiz_id=sub.quiz_id,
                        question_id=sub.question_id,
                        answer=sub.answer,
                        is_correct=sub.is_correct,
                        time_taken_seconds=sub.time_taken_seconds
                    )
                )
                conn.commit()

            flags = evaluate_submission(sub)
            
            if flags:
                with engine.connect() as conn:
                    for flag in flags:
                        conn.execute(
                            insert(cheating_flags).values(
                                id=uuid.uuid4(),
                                student_id=flag.student_id,
                                quiz_id=flag.quiz_id,
                                rule_triggered=flag.rule_triggered,
                                severity_score=flag.severity_score,
                                description=flag.description
                            )
                        )
                    conn.commit()

            # Fetch student and quiz names
            student_name = 'Unknown'
            quiz_title = 'Unknown Quiz'
            quiz_title = 'Unknown Quiz'
            with engine.connect() as conn:
                student = conn.execute(select(students).where(students.c.id == sub.student_id)).first()
                if student:
                    student_name = f'{student.first_name} {student.last_name}'

                quiz = conn.execute(select(quizzes).where(quizzes.c.id == sub.quiz_id)).first()
                if quiz:
                    quiz_title = quiz.title
                quiz_row = conn.execute(select(quizzes).where(quizzes.c.id == sub.quiz_id)).first()
                if quiz_row:
                    quiz_title = quiz_row.title

            # 5. Broadcast live update to React Dashboard
            await manager.broadcast({
                "type": "NEW_SUBMISSION",
                "submission": {**sub.model_dump(mode='json'), "student_name": student_name, "quiz_title": quiz_title},
                "flags_generated": [{**f.model_dump(mode='json'), "student_name": student_name, "quiz_title": quiz_title} for f in flags]
            })

    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        print(f"WebSocket Error: {e}")




