import express from 'express';
import dotenv from 'dotenv';
import indexRouter from './routes/index.js';
import connectDB from './config/db.js';
import userRouter from './routes/user.js';
import postRouter from './routes/post.js';
import categoryRouter from './routes/category.js';

// load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// connect to database
connectDB();

// middleware to parse json
app.use(express.json());

// mount routes
app.use('/api/', indexRouter);
app.use('/api', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/categories', categoryRouter);

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
