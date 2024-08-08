// controllers/bookController.js
const BookService = require("../services/bookService");

class BookController {
  static async addBook(req, res, next) {
    try {
      console.log(req.body);
      const book = await BookService.addBook(req.body);
      res.status(201).json(book);
    } catch (error) {
      next(error);
    }
  }

  static async getAllBooks(req, res, next) {
    try {
      const books = await BookService.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }

  static async getBookById(req, res, next) {
    try {
      const book = await BookService.getBookById(req.params.id);
      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookController;
