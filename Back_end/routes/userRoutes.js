const express = require("express");
const UserController = require("../controllers/userController");
const { authenticateJWT } = require("../middlewares/authenticateJWT");
const { authorize } = require("../middlewares/authorize");

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/:id", authenticateJWT, UserController.getUserProfile);

// New routes for update, delete, and get all users
router.put("/:id", authenticateJWT, UserController.updateUserProfile);
router.get("/", authenticateJWT, UserController.getAllUsers);

// router.patch("/approve/:id", authenticateJWT, UserController.approveUser);
// router.patch("/reject/:id", authenticateJWT, UserController.rejectUser);
// router.delete("/:id", authenticateJWT, UserController.deleteUser);

// routes/userRoutes.js

router.patch(
  "/approve/:id",
  authenticateJWT,
  authorize("manage", "User"),
  UserController.approveUser
);
router.patch(
  "/reject/:id",
  authenticateJWT,
  authorize("manage", "User"),
  UserController.rejectUser
);
router.delete(
  "/:id",
  authenticateJWT,
  authorize("manage", "User"),
  UserController.deleteUser
);

module.exports = router;
