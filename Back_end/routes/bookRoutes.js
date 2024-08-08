// routes/bookRoutes.js
const express = require("express");
const BookController = require("../controllers/bookController");

const router = express.Router();

router.post("/addBook", BookController.addBook);
router.get("/getAllBooks", BookController.getAllBooks);
router.get("/:id", BookController.getBookById);

module.exports = router;
