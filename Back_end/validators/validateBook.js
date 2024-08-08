const { z } = require("zod");

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  category_id: z
    .number()
    .int()
    .positive("Category ID must be a positive integer"),
  isbn: z
    .string()
    .regex(/^\d{3}-\d{5}$/, "ISBN must be in the format 123-45678"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters long"),
  price_per_day: z.number().positive("Price per day must be a positive number"),
  owner_id: z.number().int().positive("Owner ID must be a positive integer"),
  quantity: z
    .number()
    .int()
    .nonnegative("Quantity must be a non-negative integer"),
  image_url: z.string().url("Image URL must be a valid URL"),
});

const validateBook = (req, res, next) => {
  try {
    req.body = bookSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      errors: error.errors,
    });
  }
};

module.exports = validateBook;
