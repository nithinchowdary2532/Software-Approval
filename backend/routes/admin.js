const express = require("express");
const multer = require("multer");
const pool = require("../db"); // Import your database connection
const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" }); // Files will be saved in the "uploads" folder

// API endpoint to handle software upload
router.post("/upload", upload.single("file"), async (req, res) => {
  const { softwareName, version, description } = req.body;
  const file = req.file;

  if (!softwareName || !version || !description || !file) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Save the data into the database
    const result = await pool.query(
      "INSERT INTO software (name, version, description, file_path) VALUES ($1, $2, $3, $4) RETURNING *",
      [softwareName, version, description, file.path]
    );

    res.status(200).json({
      message: "Software uploaded successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error saving software:", error);
    res.status(500).json({ error: "Failed to upload software" });
  }
});

router.get("/users", async (req, res) => {
  try {
    // Query the database for all users
    const result = await pool.query(
      "SELECT id, username, role, created_at FROM users"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});
router.get("/software", async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT s.id, s.name, s.version, s.description, s.file_path, s.uploaded_at,
               COALESCE(sr.status, 'Not Requested') AS status
        FROM software s
        LEFT JOIN software_requests sr ON s.id = sr.software_id
        WHERE COALESCE(sr.status, 'Not Requested') != 'Approved'
      `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching software:", error);
    res.status(500).json({ error: "Failed to fetch software" });
  }
});

router.put("/software/:id", async (req, res) => {
  const { id } = req.params;
  const { name, version, description, file_path } = req.body;

  try {
    const result = await pool.query(
      "UPDATE software SET name = $1, version = $2, description = $3, file_path = $4 WHERE id = $5 RETURNING *",
      [name, version, description, file_path, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Software not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating software:", error);
    res.status(500).json({ error: "Failed to update software" });
  }
});

// Delete software by ID
router.delete("/software/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM software WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Software not found" });
    }

    res.status(200).json({ message: "Software deleted successfully" });
  } catch (error) {
    console.error("Error deleting software:", error);
    res.status(500).json({ error: "Failed to delete software" });
  }
});

module.exports = router;
