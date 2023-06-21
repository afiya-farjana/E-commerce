import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import customerReducer from '../features/customers/customerSlice';
import productReducer from '../features/product/productSlice';
import brandReducer from '../features/brand/brandSlice';
import pCategoryReducer from '../features/pcategory/pcategorySlice';
import uploadReducer from '../features/upload/uploadSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    pCategory: pCategoryReducer,
    upload: uploadReducer,
    user: userReducer,
  },
});
