import express from "express";
import { addvanceSearch, findOrder, findCart } from "../middlewares/index.js";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
} from "../controllers/index.js";

const router = express.Router();

router.get("/", [addvanceSearch], getOrders);
router.get("/:id", [findOrder], getOrderById);
router.post("/", [findCart], createOrder);
router.put("/:id", [findOrder], updateOrder);

export default router;
