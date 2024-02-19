const ErrorResponse = require("./errorResponce");

const errorHandle = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  if (err.code === 11000) {
    message = "Duplicate field entered";
    error = new ErrorResponse(message, 400);
  }
  // if (err._message === "Bank validation failed") {
  //   message = "Validation Error";
  //   error = new ErrorResponse(message, 400);
  // }
  if (err.name === "CastError") {
    message = "Correct the Id";
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server Error" });
};
module.exports = errorHandle;
