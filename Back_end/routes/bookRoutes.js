// routes/bookRoutes.js
const express = require("express");
const BookController = require("../controllers/bookController");
const { authenticateJWT } = require("../middlewares/authenticateJWT");
const { authorize, adminOnly } = require("../middlewares/authorize");
const validateBook = require("../validators/validateBook");
const router = express.Router();

// Public routes
router.get("/", BookController.getAllBooks);
router.get("/available", BookController.getAvailableBooks);

// Owner routes
router.post(
  "/",
  authenticateJWT,
  authorize("manage", "Book"),
  validateBook,
  BookController.uploadBook
);
router.patch(
  "/:id",
  authenticateJWT,
  authorize("manage", "Book"),
  validateBook,
  BookController.updateBook
);
router.delete(
  "/:id",
  authenticateJWT,
  authorize("manage", "Book"),
  BookController.removeBook
);
router.get(
  "/owner/:ownerId",
  authenticateJWT,
  authorize("manage", "Book"),
  BookController.getBooksByOwner
);
router.get(
  "/:book_id",
  authenticateJWT,
  authorize("manage", "Book"),
  BookController.getBookById
);

// // Admin routes

router.patch(
  "/approve/:id",
  authenticateJWT,
  adminOnly,
  authorize("manage", "Book"),
  BookController.approveBook
);
router.patch(
  "/available/:id",
  authenticateJWT,
  adminOnly,
  authorize("manage", "Book"),
  BookController.changeBookAvailability
);

router.patch(
  "/reject/:id",
  authenticateJWT,
  adminOnly,
  authorize("manage", "Book"),
  BookController.rejectBook
);

module.exports = router;
