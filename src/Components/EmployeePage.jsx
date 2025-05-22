import React, { useEffect, useState } from "react";
import EmployeeNavbar from "./EmployeeNavbar";
import axios from "axios";
import "./EmployeePage.css";

export default function EmployeePage() {
  const [software, setSoftware] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchSoftware();
  }, []);

  const fetchSoftware = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/software"
      );
      setSoftware(response.data);

      // Fetch statuses for all software
      const statusPromises = response.data.map((item) =>
        axios
          .get(`http://localhost:3000/api/employee/requests/${item.id}/status`)
          .then((res) => ({ id: item.id, status: res.data.status }))
          .catch(() => ({ id: item.id, status: "Not Requested" }))
      );

      const statusesArray = await Promise.all(statusPromises);
      const statusesMap = statusesArray.reduce((acc, curr) => {
        acc[curr.id] = curr.status;
        return acc;
      }, {});

      setStatuses(statusesMap);
    } catch (error) {
      console.error("Error fetching software:", error);
      setError("Failed to fetch software. Please try again later.");
    }
  };

  const handleSendRequest = async (softwareId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/employee/request",
        {
          softwareId,
        }
      );
      setSuccess(`Request sent successfully for software ID: ${softwareId}`);
      setStatuses((prev) => ({ ...prev, [softwareId]: "Requested" }));
      setTimeout(() => setSuccess(""), 3000); // Clear success message after 3 seconds
    } catch (error) {
      console.error("Error sending request:", error);
      setError("Failed to send request. Please try again later.");
      setTimeout(() => setError(""), 3000); // Clear error message after 3 seconds
    }
  };

  return (
    <div>
      <EmployeeNavbar />
      <div className="employee-page">
        <h1 className="employee-title">Available Software</h1>
        {error && <p className="employee-error">{error}</p>}
        {success && <p className="employee-success">{success}</p>}
        <table className="employee-software-table">
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
                  {statuses[item.id] === "Approved" ? (
                    <button className="approved-button" disabled>
                      Approved
                    </button>
                  ) : statuses[item.id] === "Requested" ? (
                    <button className="requested-button" disabled>
                      Requested
                    </button>
                  ) : (
                    <button
                      className="send-request-button"
                      onClick={() => handleSendRequest(item.id)}
                    >
                      Send Request
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
