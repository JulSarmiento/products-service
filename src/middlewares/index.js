import errorHandler from "./error.handler.js";
import addvanceSearch from "./addvance.search.js";
import validateModel from "./joi.validator.js";
import {
  createProductSchema,
  updateProductSchema,
  createCategorySchema,
  updateCategorySchema,
  createSubcategorySchema,
  updateSubcategorySchema,
  createOrderSchema,
  updateOrderSchema,
  createCartSchema,
  updateCartSchema,
} from "../utils/joi.schema.js";

const validatedCreateProduct = validateModel(createProductSchema);
const validateUpdateProduct = validateModel(updateProductSchema);

const validatedCreateCategory = validateModel(createCategorySchema);
const validateUpdateCategory = validateModel(updateCategorySchema);

const validatedCreateSubcategory = validateModel(createSubcategorySchema);
const validateUpdateSubcategory = validateModel(updateSubcategorySchema);

const validatedCreateOrder = validateModel(createOrderSchema);
const validateUpdateOrder = validateModel(updateOrderSchema);

const validatedCreateCart = validateModel(createCartSchema);
const validateUpdateCart = validateModel(updateCartSchema);

export {
  errorHandler,
  addvanceSearch,
  validatedCreateProduct,
  validateUpdateProduct,
  validatedCreateCategory,
  validateUpdateCategory,
  validatedCreateSubcategory,
  validateUpdateSubcategory,
  validatedCreateOrder,
  validateUpdateOrder,
  validatedCreateCart,
  validateUpdateCart
};

export { findItem, findCart, findOrder} from './items.js';