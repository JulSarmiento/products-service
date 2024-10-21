import express from 'express';
import { addvanceSearch } from '../middlewares/index.js';

import {
  getSubcategories,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory,
  deleteSubcategoryById,
} from '../controllers/index.js';

const router = express.Router();

router.get('/', [addvanceSearch], getSubcategories);
router.get('/:id', getSubcategoryById);
router.post('/', createSubcategory);
router.put('/:id', updateSubcategory);
router.delete('/:id', deleteSubcategoryById);

export default router;