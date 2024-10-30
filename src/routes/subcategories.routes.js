import express from 'express';
import { advanceSearch } from '../middlewares/index.js';

import {
  getSubcategories,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory,
  deleteSubcategoryById,
} from '../controllers/index.js';

const router = express.Router();

router.get('/', [advanceSearch], getSubcategories);
router.get('/:id', getSubcategoryById);
router.post('/', createSubcategory);
router.put('/:id', updateSubcategory);
router.delete('/:id', deleteSubcategoryById);

export default router;