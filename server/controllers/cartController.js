import { asyncHandler } from "../middlewares/asyncHandler.js";
import CustomError from "../config/CustomError.js";
import User from "../models/userModel.js";
import Products from "../models/productModel.js";

import Cart from "../models/cartModel.js";

export const addToCart = asyncHandler(async (req, res, next) => {
  const { productId } = req.query;

  let cartProduct = await Cart.find({ product: productId }).populate("product");
});
