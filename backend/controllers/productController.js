import Product from '../models/ProductModel.js';
import expressAsyncHandler from 'express-async-handler';
import slugify from 'slugify';
import {
  validateMongoObId,
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} from '../util.js';
import fs from 'fs';

//Create a product
export const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

//Get a product
export const getProduct = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoObId(id);
    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(findProduct);
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'getProduct' });
  }
});

//Get all products
export const getAllProducts = expressAsyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // Pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error('This Page does not exist');
    }
    const product = await query;
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'getAllProducts' });
  }
});

//Update Product
export const updateProduct = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoObId(id);
    if (req.body.productName) {
      req.body.slug = slugify(req.body.productName);
    }
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'getAllProducts' });
  }
});

//Delete a product
export const deleteProduct = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoObId(id);
    const deletedProduct = await Product.findOneAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'deleteProduct' });
  }
});

//Upload images
export const uploadImages = expressAsyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path, 'images');
    const urls = [];
    const files = req.files;
    console.log(files);
    for (const file of files) {
      const { path } = file;
      let modifyPath = path;
      if (path.includes('AppData')) {
        modifyPath = path.replace(
          'AppData\\Local\\Temp',
          'Desktop\\New folder\\DokanGhor\\backend\\images\\products'
        );
      }

      // console.log(renamePath);
      const newpath = await uploader(modifyPath);
      //  console.log(newpath);
      urls.push(newpath);
      fs.unlinkSync(modifyPath);
    }
    const images = urls.map((file) => {
      return file;
    });
    console.log(images);
    res.json(images);
  } catch (error) {
    //throw new Error(error);
    res.status(500).json({ error: error.message, message: 'uploadImages' });
  }
});

//Delete images
export const deleteImages = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id, 'images');
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Rating
export const rating = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { 'ratings.$.star': star, 'ratings.$.comment': comment },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
    }
    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );
    res.json(finalproduct);
  } catch (error) {
    throw new Error(error);
  }
});
