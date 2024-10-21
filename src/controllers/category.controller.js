import httpStatus from "http-status";
import { Category, Subcategory } from "../models/index.js";

export const getCategories = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const categories = await Category.findAndCountAll({
      include: Subcategory,
      where: req.where,
      limit,
      offset,
    });

    res.status(httpStatus.OK).json({
      success: true,
      data: categories,
      totalItems: categories.count,
      totalPages: Math.ceil(categories.count / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (error) {
    next(error);
  }
}

export const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: Subcategory,
    });

    if (!category) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      data: category,
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
      data: category,
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
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategoryById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    await Category.destroy({
      where: { id: categoryId }
    });
    res.status(httpStatus.OK).json({
      success: true,
      message: `Category with id ${categoryId} deleted`
    });
  } catch (error) {
    next(error);
  };
};