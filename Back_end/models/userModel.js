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

  // New method to update user information
  static async updateUser(id, updates) {
    const setString = Object.keys(updates)
      .map((key, idx) => `${key} = $${idx + 1}`)
      .join(", ");
    const values = Object.values(updates);

    const res = await pool.query(
      `UPDATE users SET ${setString}, updated_at = CURRENT_TIMESTAMP WHERE id = $${
        values.length + 1
      } RETURNING *`,
      [...values, id]
    );
    return res.rows[0];
  }

  // New method to get all users (for admin purposes)
  static async findAllUsers() {
    const res = await pool.query("SELECT * FROM users");
    return res.rows;
  }

  static async approveUser(id) {
    const res = await pool.query(
      "UPDATE users SET is_approved = TRUE WHERE id = $1 RETURNING *",
      [id]
    );
    return res.rows[0];
  }

  static async rejectUser(id) {
    const res = await pool.query(
      "UPDATE users SET is_approved = FALSE WHERE id = $1 RETURNING *",
      [id]
    );
    return res.rows[0];
  }

  static async deleteUser(id) {
    const res = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    return res.rows[0];
  }
}

module.exports = User;
