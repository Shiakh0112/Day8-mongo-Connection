const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(bodyParser.json());

const PORT = 5000;

// Connect to MongoDB
connectDB();

// Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
