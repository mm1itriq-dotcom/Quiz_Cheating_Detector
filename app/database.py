from sqlalchemy import create_engine, MetaData

DATABASE_URL = "postgresql://postgres:123456@localhost:5432/quiz_detector"

engine = create_engine(DATABASE_URL, echo=True)
metadata = MetaData()


