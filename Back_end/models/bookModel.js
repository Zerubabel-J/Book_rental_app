// models/bookModel.js
const pool = require("../config/db");

class Book {
  static async createBook({
    title,
    author,
    category_id,
    isbn,
    description,
    price_per_day,
    owner_id,
    quantity,
    available,
    approved,
  }) {
    const res = await pool.query(
      `INSERT INTO books (title, author, category_id, isbn, description, price_per_day, owner_id, quantity, available, approved) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        title,
        author,
        category_id,
        isbn,
        description,
        price_per_day,
        owner_id,
        quantity,
        available,
        approved,
      ]
    );
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query("SELECT * FROM books");
    return res.rows;
  }

  static async findById(id) {
    const res = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
    return res.rows[0];
  }

  // Other book-related database operations...
}

module.exports = Book;
