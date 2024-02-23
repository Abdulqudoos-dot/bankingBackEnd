const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema(
  {
    currencyName: { type: String, required: true },
    currencySymbol: { type: String, required: true },
    currencyCode: { type: String, required: true },
    exchangeRate: { type: Number, required: true },
    currencyFormat: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Currency", currencySchema);
