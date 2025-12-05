const UserModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUserController = async (req, res) => {
  try {
    // 1.receiving data
    let { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password)
      return res.status(400).json({
        message: "All fields are required",
      });

    // 2.hash password

    let hassPass = await bcrypt.hash(password, 10);

    // 3. save in db
    let newUser = await UserModel.create({
      name,
      email,
      mobile,
      password: hassPass,
    });

    // 4.generate JWT token

    let token = jwt.sign({ id: newUser._id }, process.env.jwt_secret_key, {
      expiresIn: "1h",
    });

    // 5. saves in cookie storage
    res.cookie("token", token);

    // 6. response
    return res.status(201).json({
      message: "User registered",
      user: newUser,
    });
  } catch (error) {
    console.log("error in regitartion", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const loginUserController = async (req, res) => {
  try {
    // 1.getting data
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        message: "Email and password are required",
      });

    // 2. find existed user
    let user = await UserModel.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 3. compare pass
    let comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass)
      return res.status(400).json({
        message: "Invalid credentials",
      });

    // 4. token generation
    let token = jwt.sign({ id: user._id }, process.env.jwt_secret_key, {
      expiresIn: "1h",
    });

    // 5.saves in cookies
    res.cookie("token", token);

    // 6. response bhejo
    return res.status(200).json({
      message: "User logged in",
      user,
    });
  } catch (error) {
    console.log("error in login", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const logoutUserController = async (req, res) => {
  try {
    let { user_id } = req.body;

    if (!user_id)
      return res.status(404).json({
        message: "User not found",
      });

    let user = await UserModel.findById(user_id);

    if (!user)
      return res.status(401).json({
        message: "User id not found ! Unauthorized",
      });

    res.clearCookie("token");

    return res.status(200).json({
      message: "User logged out",
      user: user,
    });
  } catch (error) {
    console.log("error in logout", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
};
