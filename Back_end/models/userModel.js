const pool = require("../config/db");

class User {
  static async findByEmail(email) {
    const res = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return res.rows[0];
  }

  static async createUser({ username, email, password_hash, role }) {
    const res = await pool.query(
      "INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, email, password_hash, role]
    );
    return res.rows[0];
  }

  static async findById(id) {
    const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return res.rows[0];
  }
}

module.exports = User;
