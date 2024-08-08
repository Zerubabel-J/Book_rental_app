const UserService = require("../services/userService");
const {
  validateRegister,
  validateLogin,
} = require("../validators/userValidator");

class UserController {
  static async register(req, res, next) {
    try {
      validateRegister(req.body); // Zod validation
      const user = await UserService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      validateLogin(req.body); // Zod validation

      const token = await UserService.login(req.body);

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  static async getUserProfile(req, res, next) {
    try {
      const user = await UserService.getUserProfile(req.params.id);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  // New method to update user information
  static async updateUserProfile(req, res, next) {
    try {
      const updatedUser = await UserService.updateUserProfile(
        req.params.id,
        req.body
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  // New method to get all users (for admin purposes)
  static async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async approveUser(req, res, next) {
    try {
      const user = await UserService.approveUser(req.params.id);
      res.status(200).json({
        message: `User with id ${user.id} has been approved.`,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async rejectUser(req, res, next) {
    try {
      const user = await UserService.rejectUser(req.params.id);
      res.status(200).json({
        message: `User with id ${user.id} has been rejected.`,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      await UserService.deleteUser(req.params.id);
      res.status(204).send(`User with id ${req.params.id} is deleted`);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
