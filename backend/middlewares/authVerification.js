import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import expressAsyncHandler from 'express-async-handler';

//Verify user token
export const verifyToken = expressAsyncHandler(async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    if (!token) {
      return res.status(403).send('Access Denied');
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await User.findOne({ _id: verified.id });
    req.user = admin;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Check admin or not
export const isAdmin = expressAsyncHandler(async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Admin Token' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
