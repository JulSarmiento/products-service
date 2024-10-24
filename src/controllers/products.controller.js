import httpStatus from "http-status";
import { Op } from "sequelize";
import { Product, Subcategory, Category } from "../models/index.js";

// GET ALL PRODUCTS
export const getProducts = async (req, res, next) => {
  try {
    console.log("req.where:", req.where);

    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const { rows: products, count: totalItems } = await Product.findAndCountAll(
      {
        where: req.where || {},
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
        include: [
          {
            model: Subcategory,
            include: [
              {
                model: Category,
              },
            ],
          },
        ],
      }
    );

    res.status(httpStatus.OK).json({
      success: true,
      products,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: {
        [Op.or]: [{ id }, { slug: id }],
      },
      include: [
        {
          model: Subcategory,
          include: [
            {
              model: Category,
            },
          ],
        },
      ],
    });

    if (!product) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        error: "Product not found",
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      product,
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
      product,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Update a product by Id
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        error: "Product not found",
      });
    }

    await Product.update(req.body, {
      where: { id },
    });

    const updatedProduct = await Product.findByPk(id);
    res.status(httpStatus.OK).json({
      success: true,
      updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE PRODUCT BY ID
export const deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Product.destroy({ where: { id } });
    res.status(httpStatus.OK).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
