const mongoose = require("mongoose");

let bankDetailSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    bankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bank",
    },

    date: {
      type: Date,
    },
    checkNo: {
      type: String,
      required: true,
    },
    payee: {
      type: String,
      required: true,
    },
    memo: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
    },

    deposit: {
      type: String,
    },
    balance: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("bankDetail", bankDetailSchema);
