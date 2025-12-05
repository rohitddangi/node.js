import express from "express";
import { createProductController } from "../controllers/product.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const router = express.Router();

router.get("/create", authMiddleware, createProductController);
