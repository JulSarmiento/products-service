import httpStatus from "http-status";
import { Product } from "../models/index.js";


// GET ALL PRODUCTS
export const getProducts = async(req, res, next) => {
  try {

    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const products = await Product.findAndCountAll({
      limit,
      offset
    });

    res.status(httpStatus.OK).json({
      success: true,
      data: products,
      totalItems: products.count,
      totalPages: Math.ceil(products.count / limit),
      currentPage: parseInt(page, 10)
    }) ;
  } catch (error) {
    next(error);
  };
};

// CREATE A NEW PRODUCT
export const createProduct = async (req, res, next) => {
  console.log("estamos aqui :D ")
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