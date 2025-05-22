const express = require("express");
const pool = require("../db");
const router = express.Router();

// Fetch all pending requests
router.get("/requests", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT sr.id AS request_id, sr.status, sr.created_at, 
              s.id AS software_id, s.name, s.version, s.description, s.file_path
       FROM software_requests sr
       JOIN software s ON sr.software_id = s.id
       WHERE sr.status = 'Pending'`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

router.put("/requests/:id/accept", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "UPDATE software_requests SET status = $1 WHERE id = $2 RETURNING *",
      ["Approved", id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Request not found" });
    }
    res
      .status(200)
      .json({ message: "Request accepted", request: result.rows[0] });
  } catch (error) {
    console.error("Error accepting request:", error);
    res.status(500).json({ error: "Failed to accept request" });
  }
});

router.put("/requests/:id/reject", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "UPDATE software_requests SET status = $1 WHERE id = $2 RETURNING *",
      ["Rejected", id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Request not found" });
    }
    res
      .status(200)
      .json({ message: "Request rejected", request: result.rows[0] });
  } catch (error) {
    console.error("Error rejecting request:", error);
    res.status(500).json({ error: "Failed to reject request" });
  }
});

// Fetch the status of a specific request
router.get("/requests/:id/status", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT status FROM software_requests WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json({ status: result.rows[0].status });
  } catch (error) {
    console.error("Error fetching request status:", error);
    res.status(500).json({ error: "Failed to fetch request status" });
  }
});

module.exports = router;
