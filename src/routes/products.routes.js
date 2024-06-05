import express from "express";
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProductById
} from "../controllers/products.controller.js";
import { 
  validatedCreateProduct,
  validateUpdateProduct 
  
} from "../middlewares/index.js";
import {
  addvanceSearch
} from "../middlewares/index.js"

const router = express.Router();

router.get("/", [addvanceSearch], getProducts);
router.get("/:id", getProductById);
router.post("/", [validatedCreateProduct], createProduct);
router.patch("/:id",[validateUpdateProduct], updateProduct);
router.delete("/:id", deleteProductById)

export default router;