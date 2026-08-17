import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaLeaf } from "react-icons/fa";
import API from "../services/api";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async () => {
    try {
      const response = await API.post("/login", null, {
        params: {
          email,
          password,
        },
      });

      alert(response.data.message);

      // Save JWT token
      localStorage.setItem("token", response.data.access_token);

      // Save logged-in user details
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // Trigger redirect
      setLoggedIn(true);

    } catch (error) {
      alert("Invalid Email or Password");
    }
  };

  // Redirect to Dashboard after successful login
  if (loggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-card">

          <div className="logo">
            <FaLeaf className="leaf-icon" />

            <h1>NutriGuardian AI</h1>

            <h3>
              An Agentic Generative System
              <br />
              for Sustainable Nutrition
            </h3>
          </div>

          <div className="input-group">
            <FaEnvelope className="icon" />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaLock className="icon" />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="login-btn"
            onClick={login}
          >
            Login
          </button>

          <p className="register-text">
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;