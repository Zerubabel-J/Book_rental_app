// controllers/bookController.js
const BookService = require("../services/bookService");

class BookController {
  static async uploadBook(req, res, next) {
    try {
      const book = await BookService.createBook(req.body);
      res.status(201).json(book);
    } catch (error) {
      next(error);
    }
  }

  static async updateBook(req, res, next) {
    try {
      const book = await BookService.updateBook(req.params.id, req.body);
      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }

  static async removeBook(req, res, next) {
    try {
      const book = await BookService.deleteBook(req.params.id);
      res
        .status(200)
        .json({ message: `Book with id ${req.params.id} removed` });
    } catch (error) {
      next(error);
    }
  }

  static async getBooksByOwner(req, res, next) {
    try {
      const books = await BookService.getBooksByOwner(req.params.ownerId);
      res.status(200).json(books);
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

  static async changeBookAvailability(req, res, next) {
    try {
      const book = await BookService.updateBookAvailability(
        req.params.id,
        req.body.available
      );
      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }

  static async approveBook(req, res, next) {
    try {
      const book = await BookService.approveBook(req.params.id);

      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }

  static async rejectBook(req, res, next) {
    try {
      const book = await BookService.rejectBook(req.params.id);
      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookController;
