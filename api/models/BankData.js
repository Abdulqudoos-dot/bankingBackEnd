const mongoose = require("mongoose");

let bankSchema = new mongoose.Schema(
  {
    bankName: {
      type: String,
      required: true,
    },
    acNo: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    usdBalance: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bank", bankSchema);
