import React, { useState } from "react";
import axios from "axios"; // Import Axios for API requests
import "./AdminPage.css"; // Import your CSS file
import AdminNavbar from "./AdminNavbar"; // Import the AdminNavbar component
export default function AdminPage() {
  const [form, setForm] = useState({
    softwareName: "",
    version: "",
    description: "",
    file: null,
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.softwareName ||
      !form.version ||
      !form.description ||
      !form.file
    ) {
      setMessage("All fields are required!");
      return;
    }

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append("softwareName", form.softwareName);
    formData.append("version", form.version);
    formData.append("description", form.description);
    formData.append("file", form.file);

    try {
      // Send the form data to the backend API
      const response = await axios.post(
        "http://localhost:3000/api/admin/upload", // Replace with your backend endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setMessage("Software uploaded successfully!");
        setForm({
          softwareName: "",
          version: "",
          description: "",
          file: null,
        });
      } else {
        setMessage("Failed to upload software. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading software:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  return (
    <div className="admin-page">
      <AdminNavbar />

      {/* Main Content */}
      <div className="admin-content">
        <h1 className="admin-page-title">Admin Dashboard</h1>
        <p className="admin-page-description">
          Use this form to upload new software to the system.
        </p>
        {message && <p className="admin-page-message">{message}</p>}
        <form className="admin-page-form" onSubmit={handleSubmit}>
          <input
            className="admin-page-input"
            placeholder="Software Name"
            value={form.softwareName}
            onChange={(e) => setForm({ ...form, softwareName: e.target.value })}
          />
          <input
            className="admin-page-input"
            placeholder="Version"
            value={form.version}
            onChange={(e) => setForm({ ...form, version: e.target.value })}
          />
          <textarea
            className="admin-page-textarea"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            className="admin-page-file"
            type="file"
            onChange={handleFileChange}
          />
          <button className="admin-page-button" type="submit">
            Upload Software
          </button>
        </form>
      </div>
    </div>
  );
}
