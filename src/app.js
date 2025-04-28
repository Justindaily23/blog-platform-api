import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import indexRouter from './routes/index.js';
import connectDB from './config/db.js';
import userRouter from './routes/user.js';
import postRouter from './routes/post.js';
import categoryRouter from './routes/category.js';
import commentRouter from './routes/comment.js';
import swaggerSpec from './docs/swagger.js';

// load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// connect to database
connectDB();

// middleware to parse json
app.use(express.json());

// mount routes
app.use('/api', indexRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/comments', commentRouter);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
