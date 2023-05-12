import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import express from "express";
import { isAdmin, isAuthenticated } from "../utils/authUtils.js";
const router = express.Router();

router.route("/create").post(isAuthenticated, isAdmin, createCategory);
router
  .route("/:id")
  .delete(isAuthenticated, isAdmin, deleteCategory)
  .put(isAuthenticated, isAdmin, updateCategory);
router.route("/getAll").get(getCategory);

export default router;
