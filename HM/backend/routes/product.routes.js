import express from "express";
import {
  createProductController,
  deleteProductController,
  getAllProducts,
  getSingleProductDetail,
  updateProductController,
} from "../controllers/product.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const router = express.Router();

router.post("/create", authMiddleware, createProductController);
router.get("/", getAllProducts);
router.get("/:product_id", getSingleProductDetail);
router.put("/update/:product_id", authMiddleware, updateProductController);
router.delete("/delete/:product_id", authMiddleware, deleteProductController);
