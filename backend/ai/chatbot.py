import os
from dotenv import load_dotenv
from groq import Groq

# Load .env
load_dotenv()

# Get API Key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

print("GROQ_API_KEY =", GROQ_API_KEY)

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY not found in .env")

# Create Groq client
client = Groq(api_key=GROQ_API_KEY)


def ask_ai(question: str):
    try:
        response = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are NutriGuardian AI, a helpful nutrition and health assistant. "
                        "Answer food, diet, fitness, BMI, calorie, hydration, and healthy lifestyle questions clearly."
                    )
                },
                {
                    "role": "user",
                    "content": question
                }
            ],
            temperature=0.7,
            max_tokens=2000
        )

        return response.choices[0].message.content

    except Exception as e:
        return f"Groq Error: {str(e)}"