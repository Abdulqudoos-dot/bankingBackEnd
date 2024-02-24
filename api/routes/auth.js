const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getAllUsers,
  editUser,
  deleteUser,
} = require("../controller/auth");

router.route("/register").post(register);

router.route("/login").post(login);

// admin route
router.get("/users", getAllUsers);
router.put("/users/:id", editUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
