import httpStatus from "http-status";
import { validate as isUuid } from "uuid";
import { Op } from "sequelize";
import { Product, Subcategory, Category } from "../models/index.js";

// GET ALL PRODUCTS
export const getProducts = async (req, res, next) => {
  try {
    console.log("req.where:", req.where);

    const { page = 1, limit = 10, category, subcategory } = req.query;

    console.log("getProducts", req.query);

    const offset = (page - 1) * limit;
    const { where } = req;

    const options = {
      where,
      limit,
      offset,
      exclude: ["createdAt", "updatedAt"],
      include: [
        {
          model: Subcategory,
          required: true,
          where: subcategory && { slug: subcategory },
          include: [
            {
              model: Category,
              required: true,
              where: category && { slug: category },
            },
          ],
        },
      ],
    };

    console.log("options:", JSON.stringify(options, null, 2));
    const { rows: products, count: totalItems } = await Product.findAndCountAll(
      options
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

export const getProductsByCategory = async (req, res, next) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query;
  try {
    const whereClause = isUuid(id)
      ? { id: { [Op.eq]: id } }
      : { slug: { [Op.eq]: id } };

    const category = await Category.findOne({
      where: whereClause,
      limit: parseInt(limit, 10),
      offset: parseInt((page - 1) * limit, 10),
      include: {
        model: Subcategory,
        include: [
          {
            model: Product,
          },
        ],
      },
    });

    const { SubCategories } = category;
    const products = SubCategories.flatMap(
      (subcategory) => subcategory.Products
    );

    if (!category) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const whereClause = isUuid(id)
      ? { id: { [Op.eq]: id } }
      : { slug: { [Op.eq]: id } };

    const product = await Product.findOne({
      where: whereClause,
      include: {
        model: Subcategory,
        include: [
          {
            model: Category,
          },
        ],
      },
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
