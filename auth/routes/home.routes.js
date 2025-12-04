// routes/home.routes.js
const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// protected route
router.get("/", authMiddleware, (req, res) => {
  console.log("User from middleware:", req.user);
  res.send(
    `Yaha mera account details hai, ye safe rehna zaruri hai. Logged in user: ${req.user.name} (${req.user.email})`
  );
});

module.exports = router;
