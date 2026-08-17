import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again.");
        navigate("/login");
        return;
      }

      const response = await API.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(response.data);
    } catch (error) {
      console.error("Profile Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);

        alert(
          error.response.data.detail ||
          "Unable to load profile"
        );
      } else {
        alert("Unable to connect to server.");
      }
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-overlay">

        <div className="profile-card">

          <h1>👤 My Profile</h1>

          <div className="profile-info">

            <div className="profile-row">
              <span>Name</span>
              <strong>{profile.name}</strong>
            </div>

            <div className="profile-row">
              <span>Email</span>
              <strong>{profile.email}</strong>
            </div>

            <div className="profile-row">
              <span>Age</span>
              <strong>{profile.age}</strong>
            </div>

            <div className="profile-row">
              <span>Gender</span>
              <strong>{profile.gender}</strong>
            </div>

            <div className="profile-row">
              <span>Height</span>
              <strong>{profile.height} cm</strong>
            </div>

            <div className="profile-row">
              <span>Weight</span>
              <strong>{profile.weight} kg</strong>
            </div>

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

export default Profile;