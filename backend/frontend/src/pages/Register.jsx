import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBirthdayCake,
  FaRulerVertical,
  FaWeight,
  FaLeaf
} from "react-icons/fa";
import API from "../services/api";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    height: "",
    weight: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const register = async () => {

    try {

      await API.post("/register", {
        ...user,
        age: Number(user.age),
        height: Number(user.height),
        weight: Number(user.weight)
      });

      alert("Registration Successful 🎉");

      navigate("/login");

    } catch (error) {

      alert(error.response?.data?.detail || "Registration Failed");

    }

  };

  return (

    <div className="register-page">

      <div className="register-overlay">

        <div className="register-card">

          <div className="register-logo">

            <FaLeaf className="leaf"/>

            <h1>NutriGuardian AI</h1>

            <h3>
              An Agentic Generative System
              <br />
              for Sustainable Nutrition
            </h3>

          </div>

          <div className="input-box">
            <FaUser className="icon"/>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <FaEnvelope className="icon"/>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <FaLock className="icon"/>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <FaBirthdayCake className="icon"/>
            <input
              type="number"
              name="age"
              placeholder="Age"
              onChange={handleChange}
            />
          </div>

          <div className="input-box">

            <FaUser className="icon"/>

            <select
              name="gender"
              onChange={handleChange}
            >

              <option value="">Select Gender</option>

              <option>Male</option>

              <option>Female</option>

              <option>Other</option>

            </select>

          </div>

          <div className="input-box">
            <FaRulerVertical className="icon"/>
            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <FaWeight className="icon"/>
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              onChange={handleChange}
            />
          </div>

          <button
            className="register-btn"
            onClick={register}
          >
            Register
          </button>

          <p className="login-link">

            Already have an account?

            <Link to="/login"> Login</Link>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Register;