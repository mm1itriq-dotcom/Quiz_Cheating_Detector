from app.database import engine, metadata
import app.models

def init():
    print("Creating tables in the database...")
    metadata.create_all(engine)
    print("Tables created successfully!")

if __name__ == "__main__":
    init()
