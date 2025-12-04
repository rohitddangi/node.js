// server.js
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const homeRoutes = require("./routes/home.routes");




const app = express();

// DB connect
connectDB();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // agar frontend ho to, otherwise "*"
    credentials: true,
  })
);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);

// test root route
app.get("/", (req, res) => {
  res.send("Server is working 😎");
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
