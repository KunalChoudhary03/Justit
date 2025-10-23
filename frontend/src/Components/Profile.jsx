import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Profile</h2>
      <button
        style={{ margin: "10px", padding: "10px 20px" }}
        onClick={() => navigate("/register")}
      >
        Go to Register
      </button>
      <button
        style={{ margin: "10px", padding: "10px 20px" }}
        onClick={() => navigate("/login")}
      >
        Go to Login
      </button>
    </div>
  );
};

export default Profile;
