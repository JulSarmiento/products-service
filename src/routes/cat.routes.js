import express from 'express';
import {
  getCartById,
  addProductToCart
} from '../controllers/index.js';

import {
  validatedCreateCart
} from '../middlewares/index.js';

const router = express.Router();

router.get('/:id', getCartById);
router.post('/:id?', [validatedCreateCart], addProductToCart);

export default router;