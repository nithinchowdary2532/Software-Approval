import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "12345",
  database: "project",
});

pool
  .connect()
  .then(() => console.log("✅ PostgreSQL connected"))
  .catch((err) => console.error("❌ Connection error", err));

const query = (text, params) => {
  return pool.query(text, params);
};

export { query };
