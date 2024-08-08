// app.js
const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const { errorHandler } = require("./middlewares/errorHandler");

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Routes
app.use("/api/users", userRoutes); // User-related routes
app.use("/api/books", bookRoutes); // Book-related routes

app.get("/", (req, res) => {
  res.send("Hello, Greetings!"); // Default route
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
