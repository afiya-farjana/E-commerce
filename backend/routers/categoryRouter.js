import express from 'express';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getallCategory,
  getCategory,
} from '../controllers/categoryController.js';
import { isAdmin, verifyToken } from '../middlewares/authVerification.js';

const categoryRouter = express.Router();

categoryRouter.post('/', verifyToken, isAdmin, createCategory);
categoryRouter.put('/:id', verifyToken, isAdmin, updateCategory);
categoryRouter.delete('/:id', verifyToken, isAdmin, deleteCategory);
categoryRouter.get('/:id', getCategory);
categoryRouter.get('/', getallCategory);

export default categoryRouter;
