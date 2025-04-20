import express from 'express';
import { createCategory, getCategories } from '../controllers/category.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', auth, createCategory);

export default router;
