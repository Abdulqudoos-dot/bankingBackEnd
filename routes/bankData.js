const express = require("express");
const {
  addBank,
  getAllBanks,
  updateBank,
  deleteBank,
  addBankDetails,
  getBankDetail,
} = require("../controller/bank");
const router = express.Router();

router.route("/addBank").post(addBank);
router.route("/addDetails/:bankId").post(addBankDetails);
router.route("/getDetails/:bankId").get(getBankDetail);

router.route("/getAllBanks").get(getAllBanks);
router.route("/:bankId").put(updateBank).delete(deleteBank);

module.exports = router;
