const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: "string", required: true },
  email: { type: "string", required: true },
  age: { type: Number, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
