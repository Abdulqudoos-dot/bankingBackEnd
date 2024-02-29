const express = require("express");

const {
  addBank,
  getAllBanks,
  updateBank,
  deleteBank,
  addBankDetails,
  getBankDetail,
  getBankDetailByUser,
  getBank,
  updateBankDetail,
  deleteBankDetail,
} = require("../controller/bank");
const fechUser = require("../middleware/fechUser");
const router = express.Router();

router.route("/addBank").post(fechUser, addBank);
router.route("/getAllBanks").get(fechUser, getAllBanks);
router.route("/getBank/:bankId").get(fechUser, getBank);
router.route("/:bankId").put(fechUser, updateBank).delete(fechUser, deleteBank);

router.route("/addDetails/:bankId").post(fechUser, addBankDetails);
router.route("/getDetails/:bankId").get(fechUser, getBankDetail);
router
  .route("/bankDetail/:bankDetailId")
  .put(fechUser, updateBankDetail)
  .delete(fechUser, deleteBankDetail);

router
  .route("/getDetailsbyUser/:bankId/:BankDetailsUser")
  .get(getBankDetailByUser);

module.exports = router;
