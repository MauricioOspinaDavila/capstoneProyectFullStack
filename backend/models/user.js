import pool from "../config/db.js";

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

const createUser = async (name, email, password, age, role = "user") => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password, age, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, email, password, age, role]
  );
  return result.rows[0];
};

export { findUserByEmail, createUser };
