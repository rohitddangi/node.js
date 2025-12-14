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

    await UserModel.findByIdAndUpdate(req.user._id, {
      $push: { products: newProduct._id },
    });

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

export const getSingleProductDetail = async (req, res) => {
  try {
    let product_id = req.params.product_id;

    if (!product_id)
      return res.status(404).json({
        message: "Id not found",
      });

    let product = await ProductModel.findById(product_id);

    if (!product)
      return res.status(404).json({
        message: "Product not found",
      });

    return res.status(200).json({ message: "product fetched", product });
  } catch (error) {
    console.log("error in single product", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    let product_id = req.params.product_id;

    if (!product_id)
      return res.status(404).json({
        message: "Id not found",
      });

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

    let updateProduct = await ProductModel.findByIdAndUpdate(
      product_id,
      {
        productName,
        description,
        price: {
          currency,
          amount,
        },
        category,
        sizes,
        colors,
        images,
      },
      {
        new: true,
      }
    );

    if (!updateProduct)
      return res.status(400).json({
        message: "Something went wrong",
      });

    return res.status(200).json({
      message: "Product updated",
      product: updateProduct,
    });
  } catch (error) {
    console.log("error in single product", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    let product_id = req.params.product_id;

    if (!product_id)
      return res.status(404).json({
        message: "Id not found",
      });

    let pro = await ProductModel.findByIdAndDelete(product_id);

    if (!pro)
      return res.status(400).json({
        message: "Something went wrong",
      });

    return res.status(200).json({
      message: "Product deleted",
    });
  } catch (error) {
    console.log("error in delete product", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
