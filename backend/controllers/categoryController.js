import Category from '../models/CategoryModel.js';
import expressAsyncHandler from 'express-async-handler';
import { validateMongoObId } from '../util.js';

//create category
export const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//update category
export const updateCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoObId(id);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

//delete category
export const deleteCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoObId(id);
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

//get a category
export const getCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoObId(id);
  try {
    const getaCategory = await Category.findById(id);
    res.json(getaCategory);
  } catch (error) {
    throw new Error(error);
  }
});

//get all categories
export const getallCategory = expressAsyncHandler(async (req, res) => {
  try {
    const getallCategory = await Category.find();
    res.json(getallCategory);
  } catch (error) {
    throw new Error(error);
  }
});
