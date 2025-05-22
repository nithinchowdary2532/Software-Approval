import React, { useState } from "react";
import axios from "axios"; // Import axios for API calls
import "./Signups.css"; // Import your CSS file

export default function Signup() {
  const [form, setForm] = useState({ username: "", password: "", role: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateForm = () => {
    // Check if username is valid
    if (!/^[a-zA-Z0-9_]{5,15}$/.test(form.username)) {
      setError(
        "Username must be 5-15 characters long and contain only letters, numbers, or underscores."
      );
      return false;
    }

    // Check if password is strong
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        form.password
      )
    ) {
      setError(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return false;
    }

    // Check if role is selected
    if (!form.role) {
      setError("Please select a role.");
      return false;
    }

    setError(""); // Clear error if validation passes
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        form
      );
      setSuccess("User registered successfully!");
      setError("");
      setForm({ username: "", password: "", role: "" }); // Reset the form
    } catch (error) {
      console.error("Error during signup:", error);
      setError(
        error.response?.data?.error ||
          "Failed to register user. Please try again."
      );
      setSuccess("");
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          username,
          password,
        }
      );

      if (response.status === 201) {
        // Redirect to login page on successful registration
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError(
        error.response?.data?.error || "Failed to register. Please try again."
      );
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Create Your Account</h1>
        <p className="signup-description">
          Register now to access exclusive features and manage your account.
        </p>
        {error && <p className="signup-error">{error}</p>}
        {success && <p className="signup-success">{success}</p>}
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            className="signup-input"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            className="signup-input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <select
            className="signup-select"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
          </select>
          <button className="signup-button" type="submit">
            Sign Up
          </button>
          <p className="signup-text">
            Already have an account?{" "}
            <a className="signup-link" href="/login">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
