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

  // New method to update user information
  static async updateUserProfile(id, updates) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    if (updates.password) {
      updates.password_hash = await bcrypt.hash(updates.password, 10);
      delete updates.password;
    }

    const updatedUser = await User.updateUser(id, updates);
    return updatedUser;
  }

  // New method to get all users (for admin purposes)
  static async getAllUsers() {
    const users = await User.findAllUsers();
    return users;
  }
  static async approveUser(id) {
    const user = await User.approveUser(id);
    return user;
  }
  static async rejectUser(id) {
    const user = await User.rejectUser(id);
    return user;
  }

  static async deleteUser(id) {
    const userExist = await UserService.getUserProfile(id);

    if (!userExist) {
      return res.status(404).json({ message: `User with id ${id} not found.` });
    }
    const user = await User.deleteUser(id);
    return user;
  }
}

module.exports = UserService;
