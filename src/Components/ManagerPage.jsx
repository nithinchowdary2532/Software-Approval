import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManagerPage.css"; // Add CSS for styling

export default function ManagerPage() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/manager/requests"
      );
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setError("Failed to fetch requests. Please try again later.");
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/manager/requests/${requestId}/accept`
      );
      setSuccess(`Request ID ${requestId} accepted successfully.`);
      setRequests(requests.filter((req) => req.request_id !== requestId)); // Remove accepted request
      setTimeout(() => setSuccess(""), 3000); // Clear success message after 3 seconds
    } catch (error) {
      console.error("Error accepting request:", error);
      setError("Failed to accept request. Please try again later.");
      setTimeout(() => setError(""), 3000); // Clear error message after 3 seconds
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/manager/requests/${requestId}/reject`
      );
      setSuccess(`Request ID ${requestId} rejected successfully.`);
      setRequests(requests.filter((req) => req.request_id !== requestId)); // Remove rejected request
      setTimeout(() => setSuccess(""), 3000); // Clear success message after 3 seconds
    } catch (error) {
      console.error("Error rejecting request:", error);
      setError("Failed to reject request. Please try again later.");
      setTimeout(() => setError(""), 3000); // Clear error message after 3 seconds
    }
  };

  return (
    <div className="manager-page">
      <h1 className="manager-title">Pending Software Requests</h1>
      {error && <p className="manager-error">{error}</p>}
      {success && <p className="manager-success">{success}</p>}
      <table className="manager-requests-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Software Name</th>
            <th>Version</th>
            <th>Description</th>
            <th>File Path</th>
            <th>Requested At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.request_id}>
              <td>{request.request_id}</td>
              <td>{request.name}</td>
              <td>{request.version}</td>
              <td>{request.description}</td>
              <td>{request.file_path}</td>
              <td>{new Date(request.created_at).toLocaleDateString()}</td>
              <td>
                <button
                  className="accept-request-button"
                  onClick={() => handleAcceptRequest(request.request_id)}
                >
                  Accept
                </button>
                <button
                  className="reject-request-button"
                  onClick={() => handleRejectRequest(request.request_id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
