import express from "express";
import {
  getProducts,
  createProduct
} from "../controllers/products.controller.js";
import { validatedCreateProduct } from "../middlewares/index.js";
import {
  addvanceSearch
} from "../middlewares/index.js"

const router = express.Router();

router.get("/", [addvanceSearch], getProducts);
router.post("/", [validatedCreateProduct], createProduct);

export default router;