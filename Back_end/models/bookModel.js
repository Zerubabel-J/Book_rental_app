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
    image_url,
  }) {
    const res = await pool.query(
      `INSERT INTO books (title, author, category_id, isbn, description, price_per_day,owner_id, quantity, image_url, approved, available)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9, false, false) RETURNING *`,
      [
        title,
        author,
        category_id,
        isbn,
        description,
        price_per_day,
        owner_id,
        quantity,
        image_url,
      ]
    );
    return res.rows[0];
  }

  static async updateBook(
    id,
    {
      title,
      author,
      category_id,
      isbn,
      description,
      price_per_day,
      owner_id,
      quantity,
      image_url,
    }
  ) {
    const res = await pool.query(
      `UPDATE books SET title = $1, author = $2, category_id = $3, isbn = $4, description = $5, 
       price_per_day = $6,owner_id=$7,  quantity = $8, image_url = $9 WHERE id = $10 RETURNING *`,
      [
        title,
        author,
        category_id,
        isbn,
        description,
        price_per_day,
        owner_id,
        quantity,
        image_url,
        id,
      ]
    );
    return res.rows[0];
  }

  static async deleteBook(id) {
    const res = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id]
    );
    return res.rows[0];
  }

  static async getBooksByOwner(ownerId) {
    const res = await pool.query("SELECT * FROM books WHERE owner_id = $1", [
      ownerId,
    ]);
    return res.rows;
  }

  static async getAllBooks() {
    const res = await pool.query(
      "SELECT * FROM books WHERE approved = true AND available = true"
    );
    return res.rows;
  }

  static async updateBookAvailability(id, availability) {
    const res = await pool.query(
      "UPDATE books SET available = $1 WHERE id = $2 RETURNING *",
      [availability, id]
    );
    return res.rows[0];
  }

  static async approveBook(id) {
    const res = await pool.query(
      "UPDATE books SET approved = true, available=true WHERE id = $1 RETURNING *",
      [id]
    );
    // console.log(res.rows[0]);
    return res.rows[0];
  }

  static async rejectBook(id) {
    const res = await pool.query(
      "UPDATE books SET approved = false, available=false WHERE id = $1 RETURNING *",
      [id]
    );
    return res.rows[0];
  }
}

module.exports = Book;
