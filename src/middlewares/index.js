import errorHandler from "./error.handler.js"; 
import addvanceSearch from "./addvance.search.js";
import validateModel from "./joi.validator.js";
import {createProductSchema, updateProductSchema} from "../utils/joi.schema.js"

const validatedCreateProduct = validateModel(createProductSchema);
const validateUpdateProduct = validateModel(updateProductSchema);

export {
  errorHandler,
  addvanceSearch,
  validatedCreateProduct,
  validateUpdateProduct
}