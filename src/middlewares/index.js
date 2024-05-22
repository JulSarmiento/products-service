import errorHandler from "./error.handler.js"; 
import addvanceSearch from "./addvance.search.js";
import validateModel from "./joi.validator.js";
import {createProductSchema} from "../utils/joi.schema.js"

const validatedCreateProduct = validateModel(createProductSchema);

export {
  errorHandler,
  addvanceSearch,
  validatedCreateProduct
}