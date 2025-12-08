import { ProductModel } from "../models/product.model.js";
import { UserModel } from "../models/user.model.js";

export const createProductController = async (req, res) => {
  try {
    let {
      productName,
      description,
      currency,
      amount,
      category,
      sizes,
      images,
      colors,
    } = req.body;

    if (
      !productName ||
      !description ||
      !currency ||
      !amount ||
      !category ||
      !sizes ||
      !images ||
      !colors
    ) {
      return res.status(401).json({
        message: "All fields are required",
      });
    }

    let newProduct = await ProductModel.create({
      productName,
      description,
      price: {
        currency,
        amount,
      },
      category,
      sizes,
      images,
      colors,
      user_id: req.user._id,
    });

    if (!newProduct) {
      return res.status(400).json({
        message: "Something went wrong",
        error,
      });
    }

    let currentlyLogUser = await UserModel.findById(req.user._id);

    currentlyLogUser.products.push(newProduct._id);
    await currentlyLogUser.save();

    return res.status(201).json({
      message: "Product created",
      product: newProduct,
    });
  } catch (error) {
    console.log("error in create product", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    let allPRoducts = await ProductModel.find().populate("user_id");

    return res.status(200).json({
      message: "All products fetched",
      products: allPRoducts,
    });
  } catch (error) {
    console.log("error in get product", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
