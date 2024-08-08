// routes/bookRoutes.js
const express = require("express");
const BookController = require("../controllers/bookController");
const { authenticateJWT } = require("../middlewares/authenticateJWT");
const { authorize, adminOnly } = require("../middlewares/authorize");
const validateBook = require("../validators/validateBook");
const router = express.Router();

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

// // Admin routes

router.patch(
  "/approve/:id",
  authenticateJWT,
  adminOnly,
  authorize("manage", "Book"),
  BookController.approveBook
);

router.patch(
  "/reject/:id",
  authenticateJWT,
  adminOnly,
  authorize("manage", "Book"),
  BookController.rejectBook
);

// Public routes
router.get("/", BookController.getAllBooks);

module.exports = router;
