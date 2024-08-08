// services/bookService.js
const Book = require("../models/bookModel");

class BookService {
  static async createBook(bookData) {
    return await Book.createBook(bookData);
  }

  static async updateBook(id, bookData) {
    return await Book.updateBook(id, bookData);
  }

  static async deleteBook(id) {
    return await Book.deleteBook(id);
  }

  static async getBooksByOwner(ownerId) {
    return await Book.getBooksByOwner(ownerId);
  }

  static async getAllBooks() {
    return await Book.getAllBooks();
  }

  static async updateBookAvailability(id, availability) {
    return await Book.updateBookAvailability(id, availability);
  }

  static async approveBook(id) {
    return await Book.approveBook(id);
  }

  static async rejectBook(id) {
    return await Book.rejectBook(id);
  }
}

module.exports = BookService;
