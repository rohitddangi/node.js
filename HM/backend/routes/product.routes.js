import express from "express";
import {
  createProductController,
  getAllProducts,
} from "../controllers/product.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const router = express.Router();

router.post("/create", authMiddleware, createProductController);
router.get("/", getAllProducts);
