const express = require("express");
const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/movies", movieRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
