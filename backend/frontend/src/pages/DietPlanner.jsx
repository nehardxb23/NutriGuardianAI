import { useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import "./DietPlanner.css";


function DietPlanner() {

  const [formData, setFormData] = useState({

    age: "",
    weight: "",
    height: "",

    goal: "Weight Loss",

    diet_type: "Vegetarian",

    obesity: "No",

    hypertension: "No",

    diabetes: "No",

    heart_disease: "No",

  });


  const [mealPlan, setMealPlan] = useState("");

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const generatePlan = async (e) => {

    e.preventDefault();

    setLoading(true);

    setMealPlan("");


    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );


      if (!user?.id) {

        setMealPlan(
          "❌ Please login again."
        );

        return;
      }


      const response = await API.post(
        "/diet-planner/",
        {

          user_id: user.id,

          age: Number(formData.age),

          weight: Number(formData.weight),

          height: Number(formData.height),

          goal: formData.goal,

          diet_type: formData.diet_type,

          obesity: formData.obesity,

          hypertension: formData.hypertension,

          diabetes: formData.diabetes,

          heart_disease: formData.heart_disease,

        }
      );


      setMealPlan(
        response.data.meal_plan
      );


    } catch (error) {

      console.error(
        "Diet Planner Error:",
        error
      );

      setMealPlan(
        error.response?.data?.detail ||
        "❌ Unable to generate diet plan."
      );


    } finally {

      setLoading(false);
    }

  };


  return (

    <div className="diet-layout">

      <Sidebar />

      <div className="diet-container">

        <div className="diet-header">

          <h1>
            🥗 AI Diet Planner
          </h1>

          <p>
            Generate your personalized healthy meal plan
          </p>

        </div>


        <form
          className="diet-form"
          onSubmit={generatePlan}
        >


          {/* Age */}

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            min="1"
            required
          />


          {/* Weight */}

          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
            min="1"
            step="0.1"
            required
          />


          {/* Height */}

          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={formData.height}
            onChange={handleChange}
            min="1"
            step="0.1"
            required
          />


          {/* Goal */}

          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
          >

            <option value="Weight Loss">
              Weight Loss
            </option>

            <option value="Weight Gain">
              Weight Gain
            </option>

            <option value="Muscle Gain">
              Muscle Gain
            </option>

            <option value="Maintain Weight">
              Maintain Weight
            </option>

          </select>


          {/* Diet Type */}

          <select
            name="diet_type"
            value={formData.diet_type}
            onChange={handleChange}
          >

            <option value="Vegetarian">
              Vegetarian
            </option>

            <option value="Non Vegetarian">
              Non Vegetarian
            </option>

            <option value="Vegan">
              Vegan
            </option>

            <option value="Keto">
              Keto
            </option>

          </select>


          {/* Obesity */}

          <select
            name="obesity"
            value={formData.obesity}
            onChange={handleChange}
          >

            <option value="No">
              Obesity: No
            </option>

            <option value="Yes">
              Obesity: Yes
            </option>

          </select>


          {/* Hypertension */}

          <select
            name="hypertension"
            value={formData.hypertension}
            onChange={handleChange}
          >

            <option value="No">
              Hypertension: No
            </option>

            <option value="Yes">
              Hypertension: Yes
            </option>

          </select>


          {/* Diabetes */}

          <select
            name="diabetes"
            value={formData.diabetes}
            onChange={handleChange}
          >

            <option value="No">
              Diabetes: No
            </option>

            <option value="Yes">
              Diabetes: Yes
            </option>

          </select>


          {/* Heart Disease */}

          <select
            name="heart_disease"
            value={formData.heart_disease}
            onChange={handleChange}
          >

            <option value="No">
              Heart Disease: No
            </option>

            <option value="Yes">
              Heart Disease: Yes
            </option>

          </select>


          {/* Generate */}

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Generating..."
              : "Generate Diet Plan"
            }

          </button>

        </form>


        {/* Result */}

        {mealPlan && (

          <div className="meal-result">

            <h2>
              Your Personalized Meal Plan
            </h2>

            <pre>
              {mealPlan}
            </pre>

          </div>

        )}

      </div>

    </div>

  );
}


export default DietPlanner;