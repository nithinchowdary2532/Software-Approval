// filepath: c:\Users\halek\Downloads\project\User_auth\backend\server.js
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const employeeRoutes = require("./routes/employee");
const managerRoutes = require("./routes/manager");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Mount the auth routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/manager", managerRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
