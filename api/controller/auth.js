const asyncHandler = require("../middleware/asynce");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../../utils/errorResponce");

exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.create({ username, email, password });
  const token = jwt.sign({ id: user.id }, "1234bandaenacheez1234", {
    expiresIn: "30d",
  });

  sendTokenResponse(token, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please enter email and password", 400));
  }
  let user = await User.findOne({ email, password });

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const token = jwt.sign({ id: user.id }, "1234bandaenacheez1234", {
    expiresIn: "30d",
  });
  sendTokenResponse(token, 200, res);
});

const sendTokenResponse = (token, statusCode, res) => {
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
