import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [dashboard, setDashboard] = useState({
    current_weight: 0,
    latest_calories: 0,
    total_records: 0,
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await API.get(`/dashboard/${user.id}`);
      setDashboard(response.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load Dashboard");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logout Successful");

    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-overlay">

        <div className="dashboard-card">

          <h1 className="dashboard-title">
            🥗 NutriGuardian AI
          </h1>

          <h2 className="dashboard-subtitle">
            Welcome, {user?.name}
          </h2>


          {/* =========================
              Dashboard Statistics
          ========================= */}

          <div className="dashboard-stats">

            <div className="stat-box">
              <h3>Current Weight</h3>
              <p>{dashboard.current_weight} kg</p>
            </div>

            <div className="stat-box">
              <h3>Latest Calories</h3>
              <p>{dashboard.latest_calories} kcal</p>
            </div>

            <div className="stat-box">
              <h3>Total Records</h3>
              <p>{dashboard.total_records}</p>
            </div>

          </div>


          {/* =========================
              Dashboard Buttons
          ========================= */}

          <div className="dashboard-buttons">

            <button onClick={() => navigate("/profile")}>
              👤 Profile
            </button>

            <button onClick={() => navigate("/tracking")}>
              ➕ Add Tracking
            </button>

            <button onClick={() => navigate("/weight-history")}>
              📈 Weight History
            </button>

            <button onClick={() => navigate("/calories-history")}>
              🔥 Calories History
            </button>

            <button
              className="sustainability-btn"
              onClick={() => navigate("/sustainability")}
            >
              🌱 Sustainability Score
            </button>

            <button onClick={() => navigate("/ai-chat")}>
              🤖 AI Chat
            </button>

            <button
              className="dashboard-btn"
              onClick={() => navigate("/diet-planner")}
            >
              🥗 Diet Planner
            </button>

            {/* AI Translation */}

            <button
              className="dashboard-btn"
              onClick={() => navigate("/translation")}
            >
              🌐 AI Translation
            </button>

            {/* AI Agent */}

            <button
              className="dashboard-btn"
              onClick={() => navigate("/agent")}
            >
              🧠 AI Agent
            </button>

            {/* Chat History */}

            <button
              className="sustainability-btn"
              onClick={() => navigate("/chat-history")}
            >
              💬 Chat History
            </button>

            {/* Disease Risk Prediction */}

            <button
              className="sustainability-btn"
              onClick={() => navigate("/disease-prediction")}
            >
              🩺 Disease Risk Prediction
            </button>

            {/* Logout */}

            <button
              className="logout-btn"
              onClick={logout}
            >
              🚪 Logout
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;