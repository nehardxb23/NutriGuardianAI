import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY not found in .env")

client = Groq(api_key=GROQ_API_KEY)


def translate_text(text: str, target_language: str):

    prompt = f"""
Translate the following nutrition-related text into {target_language}.

Text:
{text}

Rules:
- Translate accurately.
- Keep the original meaning.
- Use natural and easy-to-understand language.
- Return only the translated text.
"""

    try:

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2,
            max_tokens=500,
        )

        return response.choices[0].message.content

    except Exception as e:
        raise Exception(f"Translation Error: {str(e)}")
    