import express from 'express';
import {
  createProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  rating,
  uploadImages,
  deleteImages,
} from '../controllers/productController.js';
const productRoute = express.Router();
import { isAdmin, verifyToken } from '../middlewares/authVerification.js';
import { uploadPhoto, productImgResize } from '../middlewares/uploadImages.js';

productRoute.post('/', verifyToken, isAdmin, createProduct);
productRoute.put('/:id', verifyToken, isAdmin, updateProduct);
productRoute.delete('/:id', verifyToken, isAdmin, deleteProduct);
productRoute.put('/rating', verifyToken, rating);
productRoute.post(
  '/upload-images',
  verifyToken,
  isAdmin,
  uploadPhoto.array('images', 10),
  productImgResize,
  uploadImages
);
productRoute.delete('/delete-img/:id', verifyToken, isAdmin, deleteImages);

productRoute.get('/', getAllProducts);
productRoute.get('/:id', getProduct);

export default productRoute;
