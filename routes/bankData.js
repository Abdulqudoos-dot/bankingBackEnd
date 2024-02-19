const express = require("express");
const {
  addBank,
  getAllBanks,
  updateBank,
  deleteBank,
  addBankDetails,
} = require("../controller/bank");
const router = express.Router();

router.route("/addBank").post(addBank);
router.route("/addDetails").post(addBankDetails);

router.route("/getAllBanks").get(getAllBanks);
router.route("/:bankId").put(updateBank).delete(deleteBank);

module.exports = router;
