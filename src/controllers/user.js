import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Register user
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'Email already in use',
      });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        message: 'Username already taken',
      });
    }

    // Create user
    const user = new User({ email, username, password, role });
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1hr' }
    );

    return res.status(201).json({
      token,
      user: { id: user._id, username, email, role },
      message: 'Registration Successful. Please Login',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Login user

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'Invalid Login Credentials',
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid Login Credentials',
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1hr' }
    );

    return res.status(200).json({
      token,
      user: { id: user._id, email, role: user.role },
      message: `Welcome ${user.username}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
