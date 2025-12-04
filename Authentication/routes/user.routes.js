const express = require("express");
const {
  registerUserController,
  loginUserController,
  logoutUserController,
} = require("../controllers/user.controllers");

const router = express.Router();

router.post("/register", (req, res, next) => {
  console.log("👉 Register route hit hua");
  console.log("Body:", req.body);
  next(); // controller ko aage bhejenge
});

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/logout", logoutUserController);

module.exports = router;
