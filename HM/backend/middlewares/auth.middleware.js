import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

export let authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    console.log("token->", token);

    if (!token)
      return res.status(401).json({
        message: "Token not found",
      });

    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode)
      return res.status(401).json({
        message: "Invalid token ! Unauthorized",
      });

    let user = await UserModel.findById(decode.id);

    if (!user)
      return res.status(400).json({
        message: "User not found",
      });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token! Unauthorized",
      error,
    });
  }
};
