import errorHandler from "./error.handler.js";
import advanceSearch from "./addvance.search.js";
import validateModel from "./joi.validator.js";
import validateApiKey from "./apiKey.js";
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
  createIdentitySchema,
  updateIdentitySchema,
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

const validatedCreateIdentity = validateModel(createIdentitySchema);
const validateUpdateIdentity = validateModel(updateIdentitySchema);

export {
  errorHandler,
  advanceSearch,
  validateApiKey,
  validatedCreateProduct,
  validateUpdateProduct,
  validatedCreateCategory,
  validateUpdateCategory,
  validatedCreateSubcategory,
  validateUpdateSubcategory,
  validatedCreateOrder,
  validateUpdateOrder,
  validatedCreateCart,
  validateUpdateCart,
  validatedCreateIdentity,
  validateUpdateIdentity,
};

export { findItem, findCartInBody, findOrder } from "./items.js";
