import getDataUri from "../utils/getDataUri.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import CustomError from "../config/CustomError.js";
import cloudinary from "cloudinary";
import User from "../models/userModel.js";
import Products from "../models/productModel.js";

export const createProduct = asyncHandler(async (req, res, next) => {
  const { title, description, price, category, stock } = req.body;
  const file = req.file;

  const fileUri = getDataUri(file);

  const cloud = await cloudinary.v2.uploader.upload(fileUri.content);

  const product = await Products.create({
    title,
    description,
    price,
    category,
    image: {
      url: cloud.url,
      public_id: cloud.public_id,
    },
  });

  res
    .status(200)
    .json({ success: true, message: "Product added SuccessFully", product });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const { title, description, price, category } = req.body;

  const product = await Products.findByIdAndUpdate(
    req.params.id,
    { title, description, price, category },
    { new: true }
  );

  res
    .status(200)
    .json({ success: true, message: "Product Updated Successfully", product });
});

export const getAllProduct = asyncHandler(async (req, res, next) => {
  const productPerPage = 3;

  const { keyword, minPrice, maxPrice, page } = req.query;

  const query = {};
  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
  }
  if (minPrice) {
    query.price = { $gte: minPrice };
  }
  if (maxPrice) {
    if (query.price) {
      query.price.$lte = maxPrice;
    } else {
      query.price = { $lte: maxPrice };
    }
  }

  let products = await Products.find(query);
  const totalProduct = products.length;

  products = await Products.find(query)
    .skip((page - 1) * productPerPage)
    .limit(productPerPage);

  res.status(200).json({ success: true, products, totalProduct });
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Products.findById(req.params.id);

  if (!product) return next(new CustomError("Product Not Found", 404));

  await cloudinary.v2.uploader.destroy(product.image.public_id, () => {});

  await Products.findByIdAndDelete(req.params.id);

  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});

export const updateProductImage = asyncHandler(async (req, res, next) => {
  const file = req.file;

  const product = await Products.findById(req.params.id);

  const previos = product.image.public_id;

  await cloudinary.v2.uploader.destroy(previos);

  const fileUri = getDataUri(file);

  const cloud = await cloudinary.v2.uploader.upload(fileUri.content);

  product.image = {
    public_id: cloud.public_id,
    url: cloud.url,
  };
  await product.save();

  res.status(200).json({
    success: true,
    message: "Image Updated Successfully",
    previos,
    new: product.image.public_id,
  });
});

export const updateAndCreateReview = asyncHandler(async (req, res, next) => {
  const { comment, rating } = req.body;
  const product = await Products.findById(req.params.id);

  const currentUser = await User.findById(req.user._id);

  if (!product) return next(new CustomError("Product Not Found", 404));

  const reviews = product.reviews;
  const isUserAlreadyRated = reviews
    .map((review) => review.user.toString())
    .includes(currentUser._id.toString());

  if (isUserAlreadyRated) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === currentUser._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push({ rating, comment, user: currentUser._id });
  }

  await product.save();
  res.status(200).json({ success: true, review: product.reviews });
});

export const getSingleProduct = asyncHandler(async (req, res, next) => {
  const product = await Products.findById(req.params.id);

  if (!product) return next(new CustomError("Product not found", 404));

  res.status(200).json({ success: true, product });
});
