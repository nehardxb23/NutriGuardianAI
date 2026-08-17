import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import CaloriesChart from "../components/CaloriesChart";
import "./CaloriesHistory.css";

function CaloriesHistory() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [tracking, setTracking] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchTracking();
  }, []);

  const fetchTracking = async () => {
    try {
      const response = await API.get(`/tracking/${user.id}`);
      setTracking(response.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load calories history");
    }
  };

  return (
    <div className="history-page">
      <div className="history-overlay">

        <div className="history-card">

          <h1>🥗 NutriGuardian AI</h1>

          <h2>🔥 Calories History</h2>

          <div className="chart-box">
            <CaloriesChart tracking={tracking} />
          </div>

          <table>

            <thead>
              <tr>
                <th>Date</th>
                <th>Calories</th>
              </tr>
            </thead>

            <tbody>

              {tracking.map((item) => (

                <tr key={item.id}>
                  <td>{item.record_date}</td>
                  <td>{item.calories} kcal</td>
                </tr>

              ))}

            </tbody>

          </table>

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

export default CaloriesHistory;