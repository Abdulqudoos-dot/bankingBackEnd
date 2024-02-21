// currencyController.js
const Currency = require("../models/Currency"); // Assuming your model is in a separate file

exports.getCurrencies = async (req, res) => {
  try {
    const currencies = await Currency.find();
    res.json(currencies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createCurrency = async (req, res) => {
  try {
    const newCurrency = new Currency(req.body);
    const savedCurrency = await newCurrency.save();
    res.status(201).json(savedCurrency);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateCurrency = async (req, res) => {
  try {
    const updatedCurrency = await Currency.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCurrency);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteCurrency = async (req, res) => {
  try {
    await Currency.findByIdAndDelete(req.params.id);
    res.json({ message: "Currency deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
