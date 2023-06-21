import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import { error } from 'console';
import authRoute from './routers/authRouter.js';
import userRoute from './routers/userRouter.js';
import productRoute from './routers/productRouter.js';
import brandRouter from './routers/BrandRouter.js'
import categoryRouter from './routers/categoryRouter.js';
import { errorHandler, notFound } from './middlewares/errorHandle.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());

//Database connection
const PORT = process.env.PORT || 4001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
  })
  .then(() => console.log('Database Connected Successfully'))
  .catch((error) => console.log(`${error} did not connect`));

// app.use('/', (req, res) => {
//   res.send('hello from server');
// });

app.use('/api/authUser', authRoute);
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/category', categoryRouter);
app.use("/api/brand", brandRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});


