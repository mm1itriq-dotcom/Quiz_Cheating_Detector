import asyncio
import websockets
import json
import time
from sqlalchemy import create_engine, select
from dotenv import load_dotenv
import os

load_dotenv()
from app.models import students, quizzes

async def simulate_student():
    db_url = os.getenv("DATABASE_URL")
    engine = create_engine(db_url)
    
    with engine.connect() as conn:
        student = conn.execute(select(students)).first()
        quiz = conn.execute(select(quizzes)).first()
        
    if not student or not quiz:
        print("\n?? ERROR: You must create at least one Student and one Quiz via the Admin page first!\n")
        return

    student_id = str(student.id)
    quiz_id = str(quiz.id)
    
    uri = "ws://localhost:8000/ws/stream"
    async with websockets.connect(uri) as websocket:
        print(f"? Connected! Simulating student: {student.first_name} {student.last_name}")
        
        # 1. Normal Answer
        print("1?? Sending a normal answer... (15.5 seconds)")
        await websocket.send(json.dumps({
            "student_id": student_id,
            "quiz_id": quiz_id,
            "question_id": "Q1",
            "answer": "A",
            "is_correct": True,
            "time_taken_seconds": 15.5
        }))
        print("Server Response:", await websocket.recv())
        
        time.sleep(3)
        
        # 2. Cheating Answer (Too Fast)
        print("\n2?? Sending a CHEATING answer... (1.2 seconds) -> This will trigger the FAST_ANSWER alert!")
        await websocket.send(json.dumps({
            "student_id": student_id,
            "quiz_id": quiz_id,
            "question_id": "Q2",
            "answer": "B",
            "is_correct": False,
            "time_taken_seconds": 1.2
        }))
        print("Server Response:", await websocket.recv())
        print("\nLook at your React Dashboard! You should see the red alert!")

if __name__ == "__main__":
    asyncio.run(simulate_student())
