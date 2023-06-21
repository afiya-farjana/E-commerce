import User from '../models/UserModel.js';
import expressAsyncHandler from 'express-async-handler';
import { validateMongoObId } from '../util.js';

//Get all users
export const getAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single user
export const getaUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoObId(id);

  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user
export const deleteaUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoObId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user
export const updatedUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  console.log(req.user);
  validateMongoObId(id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: req?.body?.name,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
