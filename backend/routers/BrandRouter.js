import express from 'express';
import {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
} from '../controllers/BrandController.js';
import { isAdmin, verifyToken } from '../middlewares/authVerification.js';

const brandRouter = express.Router();

brandRouter.post('/', verifyToken, isAdmin, createBrand);
brandRouter.put('/:id', verifyToken, isAdmin, updateBrand);
brandRouter.delete('/:id', verifyToken, isAdmin, deleteBrand);
brandRouter.get('/:id', getBrand);
brandRouter.get('/', getallBrand);

export default brandRouter;
