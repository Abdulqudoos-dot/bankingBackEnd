const asyncHandler = require("../middleware/asynce");
const ErrorResponse = require("../../utils/errorResponce");
const BankData = require("../models/BankData");
const BankDetails = require("../models/BankDetails");
const User = require("../models/User");
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

exports.addBank = asyncHandler(async (req, res, next) => {
  req.body.userId = req.user;
  let data = await BankData.create(req.body);
  res.json({ data });
});

exports.getAllBanks = asyncHandler(async (req, res, next) => {
  //   const data = req.body;
  let data = await BankData.find();
  res.json({ data });
});

exports.updateBank = asyncHandler(async (req, res, next) => {
  const userId = req.user;
  const bankId = req.params.bankId;

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorResponse(`Not allowed`, 401));
  }

  // Check if the bank exists
  const bank = await BankData.findById(bankId);
  if (!bank) {
    return next(
      new ErrorResponse(`Bank not found with the id of ${bankId}`, 404)
    );
  }

  // Check if the user is an admin or the owner of the bank
  const isAdmin = user.isAdmin;
  const isOwner = bank.userId.equals(userId);

  if (!(isAdmin || isOwner)) {
    return next(
      new ErrorResponse(`You are not allowed to edit this bank`, 403)
    );
  }

  // Update the bank data
  const updatedBank = await BankData.findByIdAndUpdate(bankId, req.body, {
    new: true,
  });

  console.log(updatedBank);
  res.json({ data: updatedBank });
});

exports.deleteBank = asyncHandler(async (req, res, next) => {
  const userId = req.user;
  const bankId = req.params.bankId;

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorResponse(`Not allowed`, 401));
  }
  // Check if the bank exists
  const bank = await BankData.findById(bankId);
  if (!bank) {
    return next(
      new ErrorResponse(`Bank not found with the id of ${bankId}`, 404)
    );
  }

  // Check if the user is an admin or the owner of the bank
  const isAdmin = user.isAdmin;
  const isOwner = bank.userId.equals(userId);

  if (!(isAdmin || isOwner)) {
    return next(
      new ErrorResponse(`You are not allowed to delete this bank`, 403)
    );
  }

  // Delete the bank data
  const deletedBank = await BankData.findByIdAndDelete(bankId);

  console.log(deletedBank);
  res.json({ data: deletedBank });
});

exports.addBankDetails = asyncHandler(async (req, res, next) => {
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
  req.body.userId = req.user;

  let data = await BankDetails.create(req.body);
  console.log(data);
  res.json({ data });
});

exports.getBankDetail = asyncHandler(async (req, res, next) => {
  const userId = req.user;
  const bankId = req.params.bankId;

  // Check if the user exists
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorResponse(`Not allowed`, 401));
  }

  // Check if the user is an admin
  const isAdmin = user.isAdmin;

  // Check if the bank exists
  const bank = await BankData.findById(bankId);
  if (!bank) {
    return next(
      new ErrorResponse(`Bank not found with the id of ${bankId}`, 404)
    );
  }

  // Check ownership of BankDetails
  let data = await BankDetails.find({ bankId: bank._id, userId: userId });
  if (!isAdmin && data.length === 0) {
    return next(
      new ErrorResponse(`You are not allowed to get details for this bank`, 403)
    );
  }

  console.log(data);
  res.json({ data });
});
