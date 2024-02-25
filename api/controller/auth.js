const asyncHandler = require("../middleware/asynce");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../../utils/errorResponce");

exports.register = asyncHandler(async (req, res, next) => {
  req.body;
  const user = await User.create(req.body);
  const token = jwt.sign({ id: user.id }, "1234bandaenacheez1234", {
    expiresIn: "30d",
  });

  sendTokenResponse(token, 200, user, res);
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
  sendTokenResponse(token, 200, user, res);
});

const sendTokenResponse = (token, statusCode, user, res) => {
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token, user });
};

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user);
  if (!user || !user.isAdmin) {
    return next(new ErrorResponse(`Not allowed`, 401));
  }
  const users = await User.find();
  res.status(200).json(users);
});

// @desc    Edit user by ID
// @route   PUT /api/admin/users/:id
// @access  Private (only accessible to admin)
exports.editUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json(user);
});

// @desc    Delete user by ID
// @route   DELETE /api/admin/users/:id
// @access  Private (only accessible to admin)
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(
      new ErrorResponse(`User not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
