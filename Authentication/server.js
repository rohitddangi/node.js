require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const homeRoutes = require("./routes/home.routes");

const cookieParser = require("cookie-parser");

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/home", homeRoutes);

// 👉 ye naya route add karo
app.get("/", (req, res) => {
  res.send("Server is working on topp 😎");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
