const mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: { type: String, requred: true, unique: true },
    password: { type: String, requred: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
