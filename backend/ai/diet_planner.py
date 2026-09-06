import os

from dotenv import load_dotenv
from groq import Groq


# ==========================================
# Load .env
# ==========================================

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

load_dotenv(
    os.path.join(BASE_DIR, ".env")
)


# ==========================================
# Groq API Key
# ==========================================

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError(
        "GROQ_API_KEY not found in backend/.env"
    )


# ==========================================
# Groq Client
# ==========================================

client = Groq(
    api_key=GROQ_API_KEY
)


# ==========================================
# Generate Personalized Diet
# ==========================================

def generate_diet(
    age,
    weight,
    height,
    goal,
    diet_type,
    obesity,
    hypertension,
    diabetes,
    heart_disease
):

    prompt = f"""
You are NutriGuardian AI, a nutrition and meal planning assistant.

Create a healthy one-day personalized meal plan.

USER INFORMATION:

Age: {age}
Weight: {weight} kg
Height: {height} cm
Goal: {goal}
Diet Type: {diet_type}


DISEASE RISK PREDICTION RESULTS:

Obesity: {obesity}
Hypertension: {hypertension}
Diabetes: {diabetes}
Heart Disease: {heart_disease}


IMPORTANT INSTRUCTIONS:

1. Create a practical and balanced one-day meal plan.

2. Respect the user's selected diet type.

3. Respect the user's selected goal.

4. If Obesity is "Yes":
   - Prefer nutrient-dense foods.
   - Avoid excessive calories.
   - Avoid excessive sugar.
   - Avoid highly processed foods.
   - Do not recommend extreme dieting.

5. If Hypertension is "Yes":
   - Prefer lower-sodium foods.
   - Avoid excessive salt.
   - Avoid highly processed foods.
   - Include vegetables and fruits.
   - Prefer heart-healthy foods.

6. If Diabetes is "Yes":
   - Prefer high-fiber foods.
   - Avoid excessive added sugar.
   - Prefer whole grains and vegetables.
   - Avoid sugary drinks.
   - Consider balanced carbohydrate portions.

7. If Heart Disease is "Yes":
   - Prefer heart-healthy foods.
   - Include vegetables, fruits, whole grains and fiber-rich foods.
   - Prefer lean protein sources.
   - Limit saturated fat.
   - Avoid excessive sodium and highly processed foods.

8. If multiple conditions are "Yes":
   - Consider all conditions together.
   - Prioritize balanced, nutrient-dense foods.
   - Avoid excessive sugar, sodium and saturated fat.
   - Do not recommend extreme diets.

9. The selected goal must always be respected.

10. Do not recommend unsafe or extreme weight changes.

11. Do not claim to diagnose, treat or cure any disease.

12. Disease prediction results are risk indicators only, not confirmed medical diagnoses.

13. Give practical and easy-to-follow food suggestions.

14. If the user has a serious health condition or multiple
conditions, recommend consulting a qualified healthcare
professional or registered dietitian.

Return exactly in this format:

Breakfast:
Lunch:
Dinner:
Snacks:
Calories:
Health Tips:
"""


    # ==========================================
    # Call Groq
    # ==========================================

    try:

        response = client.chat.completions.create(

           model="openai/gpt-oss-20b",

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.7,

            max_tokens=800,
        )

        return response.choices[0].message.content

    except Exception as e:

        raise Exception(
            f"Groq Error: {str(e)}"
        )
