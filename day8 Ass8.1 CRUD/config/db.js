const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://127.0.0.1:27017/user_product_db",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(`mongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
