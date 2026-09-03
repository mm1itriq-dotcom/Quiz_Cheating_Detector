from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import students, stream, quizzes

app = FastAPI(
    title="Online Quiz Cheating Detector",
    description="API for detecting cheating in online quizzes using WebSockets and Rule Engines."
)

# Part 3.4 - Enabling Cross-Origin Resource Sharing (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to your frontend URL
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(students.router)
app.include_router(quizzes.router)

@app.get("/")
def read_root():
    return {"message": "Quiz Cheating Detector API is running. Go to /docs for Swagger UI!"}

app.include_router(stream.router)



