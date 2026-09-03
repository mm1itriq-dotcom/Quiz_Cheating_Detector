import os
from sqlalchemy import create_engine, MetaData
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set in the environment.")

engine = create_engine(DATABASE_URL, echo=True)
metadata = MetaData()
