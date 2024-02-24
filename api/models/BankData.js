const mongoose = require("mongoose");
const Currency = require("./Currency");

let bankSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
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
    },
  },
  { timestamps: true }
);

const getOriginalDocument = async (id) => {
  try {
    return await Bank.findById(id);
  } catch (error) {
    throw new Error("Error fetching original document: " + error.message);
  }
};

bankSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const currency = await Currency.findOne({
      currencyCode: this._update.currency,
    });

    if (!currency) {
      return next(new Error("Currency not found: " + this._update.currency));
    }

    console.log(currency.exchangeRate);
    this._update.usdBalance = this._update.balance * currency.exchangeRate;
    next();
  } catch (error) {
    next(error);
  }
});

bankSchema.pre("save", async function (next) {
  try {
    const currency = await Currency.findOne({ currencyCode: this.currency });

    if (!currency) {
      return next(new Error("Currency not found: " + this.currency));
    }
    console.log(currency.exchangeRate);
    this.usdBalance = this.balance * currency.exchangeRate;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Bank", bankSchema);
