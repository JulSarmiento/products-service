import httpStatus from "http-status";
import { Product } from "../models/index.js";


// GET ALL PRODUCTS
export const getProducts = async (req, res, next) => {
  try {
    console.log("req.where:", req.where);

    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { rows: products, count } = await Product.findAndCountAll({
      where: req.where,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    res.status(httpStatus.OK).json({
      success: true,
      data: products,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (error) {
    next(error);
  }
};

// CREATE A NEW PRODUCT
export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(httpStatus.CREATED).json({
      success: true,
      data: product,
    });
  } catch (error){
    console.log(error)
    next(error)
  };
};