import User from '../models/UserModel.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { generateToken } from '../util.js';
import jwt from 'jsonwebtoken';

//Create a new user
export const createUser = expressAsyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

//Log in
export const login = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: 'User does not exist. ' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const refreshToken = await generateToken(user._id, '5d');
      const updateuser = await User.findByIdAndUpdate(
        user.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
    } else return res.status(400).json({ msg: 'Invalid credentials. ' });

    const token = generateToken(user._id, '3d');
    delete user.password;
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Create a new admin
export const createAdmin = expressAsyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    const newUser = await User.create({
      name,
      email,
      mobile,
      password,
      isAdmin: true,
    });
    res.json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

// admin login
export const adminLogin = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email: email });
    console.log(req.body);
    if (!admin) return res.status(400).json({ msg: 'Admin does not exist. ' });
    if (!admin.isAdmin) res.status(400).json({ msg: 'Admin not authorized. ' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (isMatch) {
      const refreshToken = await generateToken(admin._id, '5d');
      const updateuser = await User.findByIdAndUpdate(
        admin.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
    } else return res.status(400).json({ msg: 'Invalid credentials. ' });

    const token = generateToken(admin._id, '3d');
    delete admin.password;
    res.status(200).json({ admin, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// logout functionality
export const logout = expressAsyncHandler(async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new Error('No Refresh Token in Cookies');

    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204); // forbidden
    }

    await User.findOneAndUpdate(refreshToken, {
      refreshToken: '',
    });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204); // forbidden
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// handle refresh token
export const handleRefreshToken = expressAsyncHandler(async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new Error('No Refresh Token in Cookies');

    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error('No Refresh token present in db or not matched');

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err || user.id !== decoded.id) {
        throw new Error('There is something wrong with the refresh token');
      }
      const accessToken = generateToken(user?._id, '5d');
      res.json({ accessToken });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
