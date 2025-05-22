const express = require("express");
const pool = require("../db");
const router = express.Router();

router.post("/request", async (req, res) => {
  const { softwareId, employeeId } = req.body; // Include employeeId in the request

  try {
    // Check if a request already exists for this employee and software
    const existingRequest = await pool.query(
      "SELECT status, created_at FROM software_requests WHERE software_id = $1 AND employee_id = $2",
      [softwareId, employeeId]
    );

    if (existingRequest.rows.length > 0) {
      const { status, created_at } = existingRequest.rows[0];

      if (status === "Requested" || status === "Approved") {
        return res.status(400).json({
          error: "You have already sent a request for this software.",
        });
      }

      if (status === "Rejected") {
        const now = new Date();
        const rejectedAt = new Date(created_at);
        const hoursSinceRejected = Math.abs(now - rejectedAt) / 36e5; // Difference in hours

        if (hoursSinceRejected < 24) {
          return res.status(400).json({
            error:
              "You must wait 24 hours before sending another request for this software.",
          });
        }
      }
    }

    // Insert a new request
    const result = await pool.query(
      "INSERT INTO software_requests (software_id, employee_id, status) VALUES ($1, $2, $3) RETURNING *",
      [softwareId, employeeId, "Requested"]
    );

    res
      .status(201)
      .json({ message: "Request sent successfully", request: result.rows[0] });
  } catch (error) {
    console.error("Error sending request:", error);
    res.status(500).json({ error: "Failed to send request" });
  }
});

router.get("/requests/:softwareId/status", async (req, res) => {
  const { softwareId } = req.params;

  try {
    const result = await pool.query(
      "SELECT status FROM software_requests WHERE software_id = $1",
      [softwareId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ status: "Not Requested" });
    }

    res.status(200).json({ status: result.rows[0].status });
  } catch (error) {
    console.error("Error fetching request status:", error);
    res.status(500).json({ error: "Failed to fetch request status" });
  }
});

router.get("/requests/status/:status", async (req, res) => {
  const { status } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM software_requests WHERE status = $1",
      [status]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: `No requests found with status: ${status}` });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching requests by status:", error);
    res.status(500).json({ error: "Failed to fetch requests by status" });
  }
});

module.exports = router;
