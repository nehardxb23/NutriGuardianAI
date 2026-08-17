import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./AddTracking.css";

function AddTracking() {

  const navigate = useNavigate();

  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState("");
  const [recordDate, setRecordDate] = useState("");

  const saveTracking = async () => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    // ==========================
    // Check Login
    // ==========================

    if (!user?.id) {

      alert(
        "User information not found. Please login again."
      );

      navigate("/login");

      return;
    }


    // ==========================
    // Validate Weight
    // ==========================

    if (!weight || parseFloat(weight) <= 0) {

      alert(
        "Please enter a valid weight."
      );

      return;
    }


    // ==========================
    // Validate Calories
    // ==========================

    if (!calories || parseInt(calories) <= 0) {

      alert(
        "Please enter valid calories."
      );

      return;
    }


    // ==========================
    // Validate Date
    // ==========================

    if (!recordDate) {

      alert(
        "Please select a date."
      );

      return;
    }


    try {

      const trackingData = {

        user_id: user.id,

        weight: parseFloat(weight),

        calories: parseInt(calories, 10),

        record_date: recordDate

      };


      console.log(
        "Saving Tracking:",
        trackingData
      );


      await API.post(
        "/tracking",
        trackingData
      );


      alert(
        "Tracking Added Successfully!"
      );


      // Go back to dashboard
      navigate("/dashboard");


    } catch (error) {

      console.error(
        "Tracking Error:",
        error
      );

      if (
        error.response?.data?.detail
      ) {

        alert(
          error.response.data.detail
        );

      } else {

        alert(
          "Unable to Save Tracking"
        );

      }

    }

  };


  return (

    <div className="tracking-page">

      <div className="tracking-overlay">

        <div className="tracking-card">

          <h1>
            ➕ Add Tracking
          </h1>


          {/* Weight */}

          <input
            type="number"
            placeholder="Enter Weight (kg)"
            value={weight}
            onChange={(e) =>
              setWeight(e.target.value)
            }
            min="0.1"
            step="0.1"
            required
          />


          {/* Calories */}

          <input
            type="number"
            placeholder="Enter Calories (kcal)"
            value={calories}
            onChange={(e) =>
              setCalories(e.target.value)
            }
            min="1"
            required
          />


          {/* Date */}

          <label>
            Record Date
          </label>

          <input
            type="date"
            value={recordDate}
            onChange={(e) =>
              setRecordDate(e.target.value)
            }
            required
          />


          {/* Save */}

          <button
            onClick={saveTracking}
          >
            💾 Save Tracking
          </button>


          {/* Back */}

          <button
            className="back-btn"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            ← Back
          </button>

        </div>

      </div>

    </div>

  );
}

export default AddTracking;