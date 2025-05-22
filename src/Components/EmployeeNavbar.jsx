import React from "react";
import { useNavigate } from "react-router-dom";
import "./EmployeeNavbar.css"; // Import your CSS file for styling

export default function EmployeeNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear the token
    navigate("/login"); // Redirect to login
  };

  return (
    <nav className="employee-navbar">
      <div className="employee-logo">Employee Portal</div>
      <ul className="employee-nav-links">
        <li>
          <a href="/employee/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/employee/tasks">Tasks</a>
        </li>
        <li>
          <a href="/employee/profile">Profile</a>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
