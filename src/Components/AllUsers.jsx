import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllUsers.css"; // Import your CSS file
import AdminNavbar from "./AdminNavbar"; // Import the AdminNavbar component

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users. Please try again later.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="all-users-page">
        <AdminNavbar /> 
      <h1 className="all-users-title">All Users</h1>
      {error && <p className="all-users-error">{error}</p>}
      <table className="all-users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
