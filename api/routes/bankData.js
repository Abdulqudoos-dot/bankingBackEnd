const express = require("express");

const {
  addBank,
  getAllBanks,
  updateBank,
  deleteBank,
  addBankDetails,
  getBankDetail,
} = require("../controller/bank");
const fechUser = require("../middleware/fechUser");
const router = express.Router();

router.route("/addBank").post(fechUser, addBank);
router.route("/getAllBanks").get(fechUser, getAllBanks);
router.route("/:bankId").put(fechUser, updateBank).delete(fechUser, deleteBank);

router.route("/addDetails/:bankId").post(fechUser, addBankDetails);
router.route("/getDetails/:bankId").get(fechUser, getBankDetail);

module.exports = router;
