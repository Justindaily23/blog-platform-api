import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/user.js';

dotenv.config();

const testUser = async () => {
  await connectDB();
  try {
    const user = new User({
      email: 'test@egmail.com',
      password: 'pass1234',
      role: 'reader',
    });
    await user.save();

    console.log('User saved:', user.email);
  } catch (error) {
    console.log('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

testUser();
