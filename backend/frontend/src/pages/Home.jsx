import "./Home.css";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">

      <div className="overlay">

        <div className="home-content">

          <h1>🥗 NutriGuardian AI</h1>

          <h2>An Agentic Generative System for Sustainable Nutrition</h2>

          <p>
            AI-powered nutrition guidance that helps you
            achieve a healthier lifestyle through
            personalized meal planning, progress tracking,
            and sustainability insights.
          </p>

          <div className="buttons">

            <Link to="/login" className="login-btn">
              Login
            </Link>

            <Link to="/register" className="register-btn">
              Register
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;