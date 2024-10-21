import httpStatus from "http-status";
import { Subcategory } from "../models/index.js";


/**
 * 
 * @param {e.Request} req 
 * @param {e.Respond} res 
 * @param {e.NextFunction} next 
 * @returns
 * @description Get all subcategories
 * @example GET /subcategories
 */
export const getSubcategories = async (req, res, next) => {
  try {
    
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const {rows, count: totalItems} = await Subcategory.findAndCountAll({
      where: req.where,
      limit,
      offset
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
  };
}

export const getSubcategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subcategory = await Subcategory.findOne( {[Op.or] : [{id}, {slug: id}]});

    if (!id) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        error: "Subcategory not found"
      });
    };

    res.status(httpStatus.OK).json({
      success: true,
      subcategory
    });

  } catch (error) {
    next(error);
  };
};

/**
 * 
 * @param {e.Request} req 
 * @param {e.Respond} res 
 * @param {e.NextFunction} next 
 * @returns
 * @description Get subcategory by id
 * @example GET /subcategories/:subcategoryId
 */
export const createSubcategory = async (req, res, next) => {
  try {
    const subcategory = await Subcategory.create(req.body);
    res.status(httpStatus.CREATED).json({
      success: true,
      subcategory
    });
  } catch (error) {
    next(error);
  };
};

/**
 * 
 * @param {e.Request} req 
 * @param {e.Respond} res 
 * @param {e.NextFunction} next 
 * @returns
 * @description Update subcategory by id
 * @example PUT /subcategories/:subcategoryId
 */
export const updateSubcategory = async (req, res, next) => {
  try {
    const { subcategoryId } = req.params;
    await Subcategory.update(req.body, {
      where: { id: subcategoryId }
    });
    res.status(httpStatus.OK).json({
      success: true,
      date: await Subcategory.findByPk(subcategoryId)
    });
  } catch (error) {
    next(error);
  };
};


/**
 * 
 * @param {e.Request} req 
 * @param {e.Respond} res 
 * @param {e.NextFunction} next 
 * @returns
 * @description Delete subcategory by id
 * @example DELETE /subcategories/:subcategoryId
 */
export const deleteSubcategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Subcategory.destroy({
      where: { id }
    });
    res.status(httpStatus.OK).json({
      success: true,
      message: `Subcategory with id ${id} deleted`
    });
  } catch (error) {
    next(error);
  };
}