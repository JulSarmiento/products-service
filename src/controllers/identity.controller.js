import httpStatus from "http-status";
import { Op } from "sequelize";
import { validate as isUuid } from 'uuid';
import { Identity } from "../models/index.js";

export const getIdentities = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { rows, count: totalItems } = await Identity.findAndCountAll({
      where: req.where,
      limit,
      offset,
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

export const getIdentityById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const whereClause = isUuid(id)
      ? { id: { [Op.eq]: id } }
      : { companyName: { [Op.eq]: id } };

    const identity = await Identity.findOne({
      where: whereClause,
    });

    if (!identity) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Identity not found',
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      identity,
    });
  } catch (error) {
    next(error);
  }
};

export const createIdentity = async (req, res, next) => {
  try {
    const identity = await Identity.create(req.body);

    res.status(httpStatus.CREATED).json({
      success: true,
      identity,
    });
  } catch (error) {
    next(error);
  }
};

export const updateIdentity = async (req, res, next) => {
  const { id } = req.params;
  try {
    const identity = await Identity.findByPk(id);

    if (!identity) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Identity not found',
      });
    }

    await identity.update(req.body);

    res.status(httpStatus.OK).json({
      success: true,
      identity,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteIdentity = async (req, res, next) => {
  const { id } = req.params;
  try {
    const identity = await Identity.findByPk(id);

    if (!identity) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Identity not found',
      });
    }

    await identity.destroy();

    res.status(httpStatus.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
};