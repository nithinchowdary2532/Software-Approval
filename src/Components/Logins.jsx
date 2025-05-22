import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Logins.css"; // Import your CSS file

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username: form.username,
      password: form.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        loginData
      );
      console.log("Login successful:", response.data);
      const role = response.data.role;
      if (role === "Admin") {
        navigate("/admin");
      } else if (role === "Manager") {
        navigate("/manager");
      } else if (role === "Employee") {
        navigate("/employee");
      } else {
        alert("Unknown role. Please contact support.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back!</h1>
        <p className="login-description">
          Please log in to access your account.
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="login-input"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="login-button" type="submit">
            Login
          </button>
          <p className="login-text">
            Don't have an account?{" "}
            <a className="login-link" href="/signup">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
