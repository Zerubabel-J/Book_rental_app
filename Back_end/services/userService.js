// services/userService.js
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {
  static async register({ username, email, password, role }) {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const password_hash = await bcrypt.hash(password, 10);
    const newUser = await User.createUser({
      username,
      email,
      password_hash,
      role,
    });
    return newUser;
  }

  static async login({ email, password }) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return token;
  }

  static async getUserProfile(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}

module.exports = UserService;
