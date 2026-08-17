import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ clearChat }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar">

      <div className="sidebar-top">

        <h2 className="logo">
          🥗 NutriGuardian
        </h2>

        <p className="logo-subtitle">
          AI Nutrition Assistant
        </p>

        <button
          className="sidebar-btn"
          onClick={clearChat}
        >
          ➕ New Chat
        </button>

      </div>

      <div className="sidebar-middle">

        <button
          className="sidebar-link"
          onClick={() => navigate("/dashboard")}
        >
          🏠 Dashboard
        </button>

        <button
          className="sidebar-link"
          onClick={() => navigate("/profile")}
        >
          👤 Profile
        </button>

        <button
          className="sidebar-link"
          onClick={() => navigate("/tracking")}
        >
          📊 Tracking
        </button>

      </div>

      <div className="sidebar-bottom">

        <div className="user-box">
          👤 {user?.name}
        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          🚪 Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;