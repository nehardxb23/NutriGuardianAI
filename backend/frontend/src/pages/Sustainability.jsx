import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Sustainability.css";

function Sustainability() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [data, setData] = useState({
    sustainability_score: 0,
    average_calories: 0,
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchScore();
  }, []);

  const fetchScore = async () => {
    try {
      const response = await API.get(
        `/sustainability-score/${user.id}`
      );

      setData(response.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load Sustainability Score");
    }
  };

  const getStatus = () => {
    const score = data.sustainability_score;

    if (score >= 90) return "Excellent";
    if (score >= 75) return "Very Good";
    if (score >= 60) return "Good";
    if (score >= 40) return "Average";

    return "Needs Improvement";
  };

  const getStars = () => {
    const score = data.sustainability_score;

    if (score >= 90) return "★★★★★";
    if (score >= 75) return "★★★★☆";
    if (score >= 60) return "★★★☆☆";
    if (score >= 40) return "★★☆☆☆";

    return "★☆☆☆☆";
  };

  return (
    <div className="sustainability-page">
      <div className="sustainability-overlay">

        <div className="sustainability-card">

          <h1>🥗 NutriGuardian AI</h1>

          <h2>🌱 Sustainability Score</h2>

          <div className="score-circle">
            {data.sustainability_score}
          </div>

          <h3 className="status">
            {getStatus()}
          </h3>

          <div className="stars">
            {getStars()}
          </div>

          <div className="info-box">

            <p>
              🔥 Average Calories
            </p>

            <h2>
              {data.average_calories} kcal
            </h2>

          </div>

          <div className="tips">

            <h3>Health Tips</h3>

            <ul>
              <li>🥗 Eat balanced meals every day.</li>
              <li>🚶 Exercise for at least 30 minutes.</li>
              <li>💧 Drink 2-3 liters of water daily.</li>
              <li>😴 Sleep 7-8 hours every night.</li>
            </ul>

          </div>

          <button
            className="back-btn"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>

        </div>

      </div>
    </div>
  );
}

export default Sustainability;