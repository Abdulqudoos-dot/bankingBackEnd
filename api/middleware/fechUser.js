const jwt = require("jsonwebtoken");
const seckey = "1234bandaenacheez1234";

const fechUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(400).json("please authenticate with correct token");
  }
  try {
    const data = jwt.verify(token, seckey);
    console.log(data.id);
    req.user = data.id;
    next();
  } catch (error) {
    return res.status(400).json("An internal error occured");
  }
};
module.exports = fechUser;
