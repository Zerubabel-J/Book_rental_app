const pool = require("../config/db");

class RentalModel {
  static async rentBook(userId, bookId) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN"); // Start a transaction

      // Check if the book is available
      const book = await client.query("SELECT * FROM books WHERE id = $1", [
        bookId,
      ]);

      if (
        !book.rows.length ||
        !book.rows[0].available ||
        book.rows[0].quantity <= 0
      ) {
        throw new Error("Book is not available for rent.");
      }

      // Decrease the quantity of the book
      const updatedBook = await client.query(
        "UPDATE books SET quantity = quantity - 1 WHERE id = $1 RETURNING *",
        [bookId]
      );

      // Log the rental in the rentals table
      const rental = await client.query(
        "INSERT INTO rentals (renter_id, book_id, rental_date) VALUES ($1, $2, NOW()) RETURNING *",
        [userId, bookId]
      );

      // Log the transaction in the transactions table
      const transaction = await client.query(
        "INSERT INTO transactions (user_id, rental_id, amount) VALUES ($1, $2, $3) RETURNING *",
        [userId, rental.rows[0].id, book.rows[0].price_per_day]
      );

      // Update or create the owner's wallet
      const ownerId = book.rows[0].owner_id;

      // Check if the owner already has a wallet entry
      const wallet = await client.query(
        "SELECT * FROM wallets WHERE user_id= $1",
        [ownerId]
      );

      if (wallet.rows.length) {
        // Update existing wallet entry
        await client.query(
          "UPDATE wallets SET balance = balance + $1 WHERE user_id = $2",
          [book.rows[0].price_per_day, ownerId]
        );
      } else {
        // Create new wallet entry
        await client.query(
          "INSERT INTO wallets (user_id, balance, created_at, updated_at) VALUES ($1, $2, NOW(), NOW())",
          [ownerId, book.rows[0].price_per_day]
        );
      }

      await client.query("COMMIT"); // Commit the transaction

      return {
        message: "Book rented successfully.",
        rental: rental.rows[0],
        transaction: transaction.rows[0],
        updatedBook: updatedBook.rows[0],
      };
    } catch (error) {
      await client.query("ROLLBACK"); // Rollback the transaction in case of error
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = RentalModel;
