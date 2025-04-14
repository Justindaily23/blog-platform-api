import express from 'express';
import dotenv from 'dotenv';
import indexRouter from './routes/index.js';

// load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//middleware to parse json
app.use(express.json());

//mount routes
app.use('/api/', indexRouter);

// start server
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
});