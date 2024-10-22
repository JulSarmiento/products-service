import express from 'express';
import {
  getCartById,
  addProductToCart
} from '../controllers/index.js';

import {
  validateUpdateCart
} from '../middlewares/index.js';

const router = express.Router();

router.get('/:id', getCartById);
router.post('/:id?', [validateUpdateCart], addProductToCart);

export default router;