import express from "express";

import {
  getProducts,
  createProduct,
  getProductById,
  getProductsByCategory,
  updateProduct,
  deleteProductById
} from "../controllers/index.js";

import { 
  validatedCreateProduct,
  validateUpdateProduct,
  advanceSearch,
} from "../middlewares/index.js"

const router = express.Router();

router.get("/", [advanceSearch(["category", "subcategory"], [ "name", 'description'], ['price'])], getProducts);
router.get("/:id", getProductById);
router.get("/category/:id", getProductsByCategory);
router.post("/", [validatedCreateProduct], createProduct);
router.patch("/:id",[validateUpdateProduct], updateProduct);
router.delete("/:id", deleteProductById)

export default router;
