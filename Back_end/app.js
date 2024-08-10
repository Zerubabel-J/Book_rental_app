const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const rentalRoutes = require("./routes/rentalRoute");
const { errorHandler } = require("./middlewares/errorHandler");
const { authenticateJWT } = require("./middlewares/authenticateJWT");

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Routes
app.use("/api/users", userRoutes); // User-related routes
app.use("/api/books", authenticateJWT, bookRoutes); // Book-related routes (protected)
app.use("/api/rent", rentalRoutes); // User-related routes

// Default route
app.get("/", (req, res) => {
  res.send("Hello, Greetings!");
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
