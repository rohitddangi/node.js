import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./config/db.js";
import { router as authRoutes } from "./routes/auth.routes.js";
import { router as productRoutes } from "./routes/product.routes.js";

import cookieParser from "cookie-parser";

connectDB();
const app = express();
app.use(cookieParser());

app.use(express.json());
app.get("/", (req, res) => {
  res.send("server ache se chal rha hai");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(3000, () => {
  
  console.log("server is running on port 3000");
});
