import express from 'express';
import {
  createUser,
  createAdmin,
  login,
  logout,
  handleRefreshToken,
  adminLogin,
} from '../controllers/authController.js';
import { isAdmin, verifyToken } from '../middlewares/authVerification.js';

const authRoute = express.Router();

authRoute.post('/register', createUser);
authRoute.post('/admin-register',verifyToken,isAdmin, createAdmin);
authRoute.post('/login', login);
authRoute.post('/admin-login', adminLogin);
authRoute.get('/logout', logout);
authRoute.get('/refresh', handleRefreshToken);

export default authRoute;
