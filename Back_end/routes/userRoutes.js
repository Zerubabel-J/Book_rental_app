const express = require("express");
const UserController = require("../controllers/userController");
const { authenticateJWT } = require("../middlewares/authenticateJWT");

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/:id", authenticateJWT, UserController.getUserProfile);

module.exports = router;
