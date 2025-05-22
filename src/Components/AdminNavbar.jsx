import React from "react";
import "./AdminNavbar.css";
import { useNavigate } from "react-router-dom";
export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear the token
    navigate("/login"); // Redirect to login
  };
  return (
    <nav className="admin-navbar">
      <div className="admin-logo">Admin</div>
      <ul className="admin-nav-links">
        <li>
          <a href="/admin">New Software</a>
        </li>
        <li>
          <a href="/all-users">All Users</a>
        </li>
        <li>
          <a href="#access">Access</a>
        </li>
        <li>
          <a href="/software">Software</a>
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
