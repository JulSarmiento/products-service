import express from 'express';
import { addvanceSearch } from '../middlewares/index.js';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
} from '../controllers/index.js';

const router = express.Router();

router.get('/', [addvanceSearch], getOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id', updateOrder);


export default router;