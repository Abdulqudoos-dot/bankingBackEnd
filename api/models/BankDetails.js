const mongoose = require("mongoose");

let bankDetailSchema = new mongoose.Schema(
  {
    bankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bank",
    },
    date: {
      type: Date,
    },
    checkNo: {
      type: Number,
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
      type: Number,
      required: true,
    },

    deposit: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("bankDetail", bankDetailSchema);
