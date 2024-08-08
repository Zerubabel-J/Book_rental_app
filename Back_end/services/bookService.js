// services/bookService.js
const Book = require("../models/bookModel");

class BookService {
  static async addBook({
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
    const newBook = await Book.createBook({
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
    });
    return newBook;
  }

  static async getAllBooks() {
    const books = await Book.findAll();
    return books;
  }

  static async getBookById(id) {
    const book = await Book.findById(id);
    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  }
}

module.exports = BookService;
