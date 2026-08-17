from ai.chatbot import ask_ai


def run_agent(
    question: str,
    tracking_data=None,
    meal_history=None
):
    """
    NutriGuardian Agentic AI.

    Uses:
    - User question
    - Weight/calorie tracking history
    - Previous meal-plan history

    to generate a personalized response.
    """

    question_lower = question.lower().strip()

    # ==========================================
    # Tracking Data Context
    # ==========================================

    tracking_context = ""

    if tracking_data:

        # Use the latest records first
        recent_tracking = tracking_data[-10:]

        tracking_context = "\n\nUSER TRACKING HISTORY:\n"

        for record in recent_tracking:
            tracking_context += (
                f"- Date: {record.record_date}, "
                f"Weight: {record.weight} kg, "
                f"Calories: {record.calories} kcal\n"
            )

        # Calculate basic progress
        if len(tracking_data) >= 2:

            first_record = tracking_data[0]
            latest_record = tracking_data[-1]

            weight_change = (
                latest_record.weight -
                first_record.weight
            )

            tracking_context += (
                "\nWEIGHT PROGRESS SUMMARY:\n"
                f"- Starting weight: {first_record.weight} kg\n"
                f"- Latest weight: {latest_record.weight} kg\n"
                f"- Weight change: {round(weight_change, 2)} kg\n"
            )

    else:

        tracking_context = """
USER TRACKING HISTORY:
No tracking data is available.
"""


    # ==========================================
    # Meal History Context
    # ==========================================

    meal_context = ""

    if meal_history:

        # Use the most recent meal plans
        recent_meals = meal_history[:5]

        meal_context = "\n\nUSER MEAL PLAN HISTORY:\n"

        for meal in recent_meals:

            meal_context += (
                f"- Date: {meal.created_at}, "
                f"Goal: {meal.goal}, "
                f"Diet Type: {meal.diet_type}, "
                f"Weight: {meal.weight} kg\n"
                f"Meal Plan: {meal.meal_plan}\n"
            )

    else:

        meal_context = """
USER MEAL PLAN HISTORY:
No previous meal plans are available.
"""


    # ==========================================
    # Combine User Information
    # ==========================================

    user_context = (
        tracking_context +
        meal_context
    )


    # ==========================================
    # Base Agent Instructions
    # ==========================================

    base_instruction = f"""
You are NutriGuardian's Agentic AI Nutrition Assistant.

You are helping the user with nutrition and healthy
lifestyle questions.

USER QUESTION:
{question}

{user_context}

IMPORTANT INSTRUCTIONS:

1. Use the user's actual tracking data when it is
   relevant to the question.

2. Use previous meal plans when they are relevant.

3. If weight progress information is available,
   explain the trend clearly.

4. If calorie records are available, use them as
   supporting information.

5. Never invent user data.

6. If there is not enough information, clearly say
   that more tracking information is needed.

7. Give practical, balanced and safe guidance.

8. Do not recommend extreme diets, starvation,
   excessive exercise or unsafe weight changes.

9. Do not assume that a single calorie number is
   appropriate for every person.

10. Keep the answer simple and easy to understand.
"""


    # ==========================================
    # Decide Agent Task
    # ==========================================

    if any(word in question_lower for word in [
        "weight loss",
        "lose weight",
        "lose some weight",
        "weight gain",
        "gain weight",
        "gain some weight",
        "my weight",
        "weight progress",
        "weight progressing",
        "weight change"
    ]):

        task_instruction = """
The user is asking about weight management.

Analyze the user's weight history if available.

Explain whether the recorded weight appears to be
increasing, decreasing or relatively stable.

Consider calorie information when useful.

Provide practical nutrition recommendations based
on the user's goal.

Do not make a medical diagnosis.
"""


    elif any(word in question_lower for word in [
        "diet",
        "meal plan",
        "breakfast",
        "lunch",
        "dinner",
        "meal",
        "food",
        "what should i eat",
        "what can i eat"
    ]):

        task_instruction = """
The user is asking about food or meal planning.

Review previous meal plans and the user's tracking
information when relevant.

Do not blindly repeat an old meal plan.

Suggest balanced foods and meals appropriate to the
information available.

Consider the user's goal and diet type when known.
"""


    elif any(word in question_lower for word in [
        "exercise",
        "workout",
        "gym",
        "muscle",
        "fitness",
        "protein",
        "hydration"
    ]):

        task_instruction = """
The user is asking about exercise, fitness or
exercise-related nutrition.

Use the user's information when relevant.

Give practical advice about protein, hydration,
balanced nutrition and exercise support.

Avoid unsafe or extreme recommendations.
"""


    elif any(word in question_lower for word in [
        "calories",
        "calorie",
        "daily calories",
        "how many calories",
        "calorie intake"
    ]):

        task_instruction = """
The user is asking about calories.

Analyze their recorded calorie information when
available.

Explain what the recorded information means.

Do not claim that one specific calorie target is
universally correct.

If personal information is insufficient, explain
what additional information would be useful.
"""


    else:

        task_instruction = """
Answer the user's nutrition or healthy-lifestyle
question using their available information.

Personalize the response when the available data
supports personalization.

If the available information does not answer the
question, say so clearly rather than guessing.
"""


    # ==========================================
    # Final Prompt
    # ==========================================

    prompt = (
        base_instruction +
        "\n\nTASK:\n" +
        task_instruction
    )


    # ==========================================
    # Generate AI Response
    # ==========================================

    answer = ask_ai(prompt)

    return answer