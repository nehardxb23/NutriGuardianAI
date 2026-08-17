from dotenv import load_dotenv
import os

print("Exists:", os.path.exists(".env"))

with open(".env", "r", encoding="utf-8") as f:
    print("Content:")
    print(repr(f.read()))

load_dotenv(".env")

print("GROQ_API_KEY:", os.getenv("GROQ_API_KEY"))