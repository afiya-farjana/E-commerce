import express from 'express';
import {
  getAllUsers,
  getaUser,
  deleteaUser,
  updatedUser,
} from '../controllers/userController.js';
import { verifyToken, isAdmin } from '../middlewares/authVerification.js';

const userRoute = express.Router();

userRoute.get('/getAllUsers', getAllUsers);
userRoute.get('/:id', verifyToken, isAdmin, getaUser);
userRoute.delete('/:id', deleteaUser);
userRoute.put('/:id', verifyToken, updatedUser);

export default userRoute;
