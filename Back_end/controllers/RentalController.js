const RentalModel = require("../models/rentalModel");
class RentalController {
  static async rentBook(req, res) {
    try {
      const user_id = req.user.id;
      const book_id = req.params.book_id;

      const result = await RentalModel.rentBook(user_id, book_id);

      res.status(200).json({
        message: "Book rented successfully.",
        rental: result.rental,
        transaction: result.transaction,
        book: result.updatedBook,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = RentalController;
