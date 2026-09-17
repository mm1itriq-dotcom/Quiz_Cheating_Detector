import os
from sqlalchemy import create_engine, MetaData
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:YOUR_PASSWORD@localhost:5432/quiz_detector")

engine = create_engine(DATABASE_URL, echo=True)
metadata = MetaData()


