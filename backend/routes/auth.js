const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { query } = require("../db"); // Import the query function
const router = express.Router();
const JWT_SECRET = "your_jwt_secret";

router.post("/signup", async (req, res) => {
  const { username, password, role } = req.body;

  console.log("Request body received:", req.body);
  if (!username || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const hash = await bcrypt.hash(password, 10);
  try {
    await query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)",
      [username, hash, role]
    );
    res.status(201).send("User created");
  } catch (err) {
    if (err.code === "23505") {
      // PostgreSQL unique violation error code
      console.error("Duplicate username:", err.message);
      return res.status(400).json({ error: "Username already exists" });
    }
    console.error("Database error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Invalid credentials");
  }
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
  res.json({ token, role: user.role });
});

router.get("/test-db", async (req, res) => {
  try {
    const result = await query("SELECT 1");
    res.status(200).send("Database connection is working");
  } catch (err) {
    console.error("Database connection error:", err.message);
    res.status(500).send("Database connection failed");
  }
});

module.exports = router;
