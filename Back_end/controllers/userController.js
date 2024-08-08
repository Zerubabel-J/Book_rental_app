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
}

module.exports = UserController;
