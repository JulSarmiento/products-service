import express from 'express';
import {
  getCartById,
  addProductToCart
} from '../controllers/index.js';

const router = express.Router();

router.get('/:id', getCartById);
router.post('/:id', addProductToCart);

export default router;