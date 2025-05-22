import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SoftwarePage.css";
import AdminNavbar from "./AdminNavbar"; // Import the AdminNavbar component

export default function SoftwarePage() {
  const [software, setSoftware] = useState([]);
  const [error, setError] = useState("");
  const [editSoftware, setEditSoftware] = useState(null);

  useEffect(() => {
    fetchSoftware();
  }, []);

  const fetchSoftware = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/software"
      );
      setSoftware(response.data);
    } catch (error) {
      console.error("Error fetching software:", error);
      setError("Failed to fetch software. Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/software/${id}`);
      fetchSoftware(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting software:", error);
      setError("Failed to delete software. Please try again later.");
    }
  };

  const handleEdit = (software) => {
    console.log("Editing software with ID:", software.id); // Log the ID to the console
    setEditSoftware(software);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/admin/software/${editSoftware.id}`,
        editSoftware
      );
      setEditSoftware(null); // Close the edit form
      fetchSoftware(); // Refresh the list after editing
    } catch (error) {
      console.error("Error updating software:", error);
      setError("Failed to update software. Please try again later.");
    }
  };

  return (
    <div className="software-page">
      <AdminNavbar />
      <h1 className="software-title">All Software</h1>
      {error && <p className="software-error">{error}</p>}
      <table className="software-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Version</th>
            <th>Description</th>
            <th>File Path</th>
            <th>Uploaded At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {software.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.version}</td>
              <td>{item.description}</td>
              <td>{item.file_path}</td>
              <td>{new Date(item.uploaded_at).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => handleEdit(item)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editSoftware && (
        <form className="edit-form" onSubmit={handleEditSubmit}>
          <h2>Edit Software</h2>
          <input
            type="text"
            value={editSoftware.name}
            onChange={(e) =>
              setEditSoftware({ ...editSoftware, name: e.target.value })
            }
            placeholder="Name"
          />
          <input
            type="text"
            value={editSoftware.version}
            onChange={(e) =>
              setEditSoftware({ ...editSoftware, version: e.target.value })
            }
            placeholder="Version"
          />
          <textarea
            value={editSoftware.description}
            onChange={(e) =>
              setEditSoftware({ ...editSoftware, description: e.target.value })
            }
            placeholder="Description"
          />
          <input
            type="text"
            value={editSoftware.file_path}
            onChange={(e) =>
              setEditSoftware({ ...editSoftware, file_path: e.target.value })
            }
            placeholder="File Path"
          />
          <button type="submit" className="save-button">
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditSoftware(null)}
            className="cancel-button"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
