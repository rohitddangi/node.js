import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

export const registerController = async (req, res) => {
  try {
    let { username, email, mobile, password } = req.body;

    if (!username || !email || !mobile || !password) {
      return res.status(401).json({
        message: "All fields are required",
      });
    }

    let hashPass = await bcrypt.hash(password, 10);

    let newUser = await UserModel.create({
      username,
      email,
      mobile,
      password: hashPass,
    });

    if (!newUser)
      return res.status(401).json({
        message: "Something went wrong",
        error,
      });

    let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(201).json({
      message: "User registered",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(404).json({
        message: "All fields are required",
      });

    let user = await UserModel.findOne({
      email,
    });

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    let comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass)
      return res.status(403).json({
        message: "Invalid credentials",
      });

    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(200).json({
      message: "User logged in",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    let { user_id } = req.body;

    if (!user_id)
      return res.status(404).json({
        message: "Id not found",
      });

    res.clearCookie("token");

    return res.status(200).json({
      message: "User logged out",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};