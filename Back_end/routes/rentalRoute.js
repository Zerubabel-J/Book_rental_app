// routes/bookRoutes.js
const express = require("express");
const RentalController = require("../controllers/RentalController");
const { authenticateJWT } = require("../middlewares/authenticateJWT");
const { authorize, adminOnly } = require("../middlewares/authorize");
const validateBook = require("../validators/validateBook");
const router = express.Router();

router.post("/:book_id", authenticateJWT, RentalController.rentBook);

module.exports = router;
