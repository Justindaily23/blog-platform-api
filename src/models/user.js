import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    role: {
      type: String,
      enum: ['reader', 'author', 'admin'],
      default: 'reader',
      set: (v) => (typeof v === 'string' ? v.toLowerCase() : v),
      validate: {
        validator(v) {
          return typeof v === 'string';
        },
        message: (props) =>
          `${props.value} is not a valid role! Must be a string.`,
      },
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function hashPasswordIfModified() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
