import Brand from '../models/BrandModel.js';
import expressAsyncHandler from 'express-async-handler';
import { validateMongoObId } from '../util.js';

export const createBrand = expressAsyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch (error) {
    throw new Error(error);
  }
});

export const updateBrand = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoObId(id);
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBrand);
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteBrand = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoObId(id);
  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);
    res.json(deletedBrand);
  } catch (error) {
    throw new Error(error);
  }
});

export const getBrand = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoObId(id);
  try {
    const getaBrand = await Brand.findById(id);
    res.json(getaBrand);
  } catch (error) {
    throw new Error(error);
  }
});

export const getallBrand = expressAsyncHandler(async (req, res) => {
  try {
    const getallBrand = await Brand.find();
    res.json(getallBrand);
  } catch (error) {
    throw new Error(error);
  }
});
