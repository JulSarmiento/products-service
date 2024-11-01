import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategoryById,
} from '../controllers/index.js';

import {
  advanceSearch,
  validatedCreateCategory,
  validateUpdateCategory,
} from '../middlewares/index.js';


const router = express.Router();

router.get('/', [advanceSearch(["subcategory"])], getCategories);
router.get('/:id', getCategoryById);
router.post('/', [validatedCreateCategory], createCategory);
router.put('/:id', [validateUpdateCategory], updateCategory);
router.delete('/:id', deleteCategoryById);




export default router;