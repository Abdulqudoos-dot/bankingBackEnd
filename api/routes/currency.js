const express = require("express");
const router = express.Router();
const currencyController = require("../controller/currency"); // Update the path accordingly
router.get("/currencies", currencyController.getCurrencies);
router.post("/currencies", currencyController.createCurrency);
router.put("/currencies/:id", currencyController.updateCurrency);
router.delete("/currencies/:id", currencyController.deleteCurrency);
module.exports = router;
