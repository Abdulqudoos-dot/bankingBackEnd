const express = require("express");
const router = express.Router();
const {
  addCategory,
  getAllCategories,
  getCategoryById,
  editCategory,
  deleteCategory,
} = require("../controller/category");

router.get("/", getAllCategories);
router.get("/:categoryId", getCategoryById);
router.post("/add", addCategory);
router.put("/:categoryId", editCategory);
router.delete("/:categoryId", deleteCategory);

module.exports = router;
