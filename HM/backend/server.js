import express from "express";
import { connectDB } from "./config/db.js";
import { router as authRoutes } from "./routes/auth.routes.js";

const app = express();

connectDB();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("server ache se chal rha hai");
});

app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  
  console.log("server is running on port 3000");
});
