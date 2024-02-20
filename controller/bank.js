const asyncHandler = require("../middleware/asynce");
const BankData = require("../models/BankData");
const BankDetails = require("../models/BankDetails");
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponce");

exports.addBank = asyncHandler(async (req, res, next) => {
  //   const data = req.body;
  let data = await BankData.create(req.body);
  console.log(data);
  res.json({ data });
});

exports.getAllBanks = asyncHandler(async (req, res, next) => {
  //   const data = req.body;
  let data = await BankData.find();
  console.log(data);
  res.json({ data });
});

exports.updateBank = asyncHandler(async (req, res, next) => {
  //   const data = req.body;
  const bank = await BankData.findById(req.params.bankId);

  if (!bank) {
    return next(
      new ErrorResponse(
        `bank not found with the id of ${req.params.bankId}`,
        404
      )
    );
  }
  let data = await BankData.findByIdAndUpdate(req.params.bankId, req.body, {
    new: true,
  });
  console.log(data);
  res.json({ data });
});

exports.deleteBank = asyncHandler(async (req, res, next) => {
  //   const data = req.body;
  const bank = await BankData.findById(req.params.bankId);

  if (!bank) {
    return next(
      new ErrorResponse(
        `bank not found with the id of ${req.params.bankId}`,
        404
      )
    );
  }
  let data = await BankData.findByIdAndDelete(req.params.bankId);
  console.log(data);
  res.json({ data });
});

exports.addBankDetails = asyncHandler(async (req, res, next) => {
  //   const data = req.body;
  const bank = await BankData.findById(req.params.bankId);

  if (!bank) {
    return next(
      new ErrorResponse(
        `bank not found with the id of ${req.params.bankId}`,
        404
      )
    );
  }
  req.body.bankId = bank._id;
  // req.body.user = req.user;

  let data = await BankDetails.create(req.body);
  console.log(data);
  res.json({ data });
});

exports.getBankDetail = asyncHandler(async (req, res, next) => {
  const bank = await BankData.findById(req.params.bankId);
  if (!bank) {
    return next(
      new ErrorResponse(
        `bank not found with the id of ${req.params.bankId}`,
        404
      )
    );
  }
  let data = await BankDetails.find({ bankId: bank._id });
  console.log(data);
  res.json({ data });
});
