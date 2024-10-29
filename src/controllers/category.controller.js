import httpStatus from "http-status";
import { Op } from "sequelize";
import { validate as isUuid } from 'uuid';
import { Category, Subcategory, Product } from "../models/index.js";

export const getCategories = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { rows, count: totalItems } = await Category.findAndCountAll({
      where: req.where,
      limit,
      offset,
      include: {
        model: Subcategory,
        include: [
          {
            model: Product,
          },
        ],
      },
    });

    res.status(httpStatus.OK).json({
      success: true,
      rows,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const whereClause = isUuid(id)
      ? { id: { [Op.eq]: id } }
      : { slug: { [Op.eq]: id } };

    const category = await Category.findOne({
      where: whereClause,
      include: {
        model: Subcategory,
        include: [
          {
            model: Product,
          },
        ],
      },
    });

    if (!category) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);

    res.status(httpStatus.CREATED).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Category not found",
      });
    }

    await category.update(req.body);

    res.status(httpStatus.OK).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Category.destroy({
      where: { id },
    });
    res.status(httpStatus.OK).json({
      success: true,
      message: `Category with id ${id} deleted`,
    });
  } catch (error) {
    next(error);
  }
};
