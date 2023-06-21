import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';

export const validateMongoObId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error('This id is not valid or not Found');
};

export const generateToken = (id, expireDate) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: expireDate,
  });
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

export const cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileToUploads, (result) => {
      resolve(
        {
          url: result.url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: 'auto',
        }
      );
    });
  });
};
export const cloudinaryDeleteImg = async (fileToDelete) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(fileToDelete, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: 'auto',
        }
      );
    });
  });
};
