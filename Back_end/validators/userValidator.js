const { z } = require("zod");

const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "owner", "customer"]),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function validateRegister(data) {
  registerSchema.parse(data);
}

function validateLogin(data) {
  loginSchema.parse(data);
}

module.exports = { validateRegister, validateLogin };
