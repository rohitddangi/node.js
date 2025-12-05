import express from "express";
import { registerController } from "../controllers/auth.controllers.js";

export const router = express.Router();

router.post("/register", registerController);
