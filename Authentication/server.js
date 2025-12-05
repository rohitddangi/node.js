require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const homeRoutes = require("./routes/home.routes");

const cookieParser = require("cookie-parser");

const app = express();

connectDB();

app.use(express.json());


// this is required for cors policy
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
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
