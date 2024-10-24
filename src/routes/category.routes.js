import express from 'express';
import { addvanceSearch } from '../middlewares/index.js';

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategoryById,
} from '../controllers/index.js';

import {
  validatedCreateCategory,
  validateUpdateCategory,
} from '../middlewares/index.js';


const router = express.Router();

router.get('/', [addvanceSearch], getCategories);
router.get('/:id', getCategoryById);
router.post('/', [validatedCreateCategory], createCategory);
router.put('/:id', [validateUpdateCategory], updateCategory);
router.delete('/:id', deleteCategoryById);




export default router;