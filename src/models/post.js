import mongoose from 'mongoose';
// import slugify from 'slugify';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    content: {
      type: String,
      required: [true, 'content is required'],
      trim: true,
    },
    image: {
      type: String,
      trim: true,
      required: false,
      default: null,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    dislikedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
/*
postSchema.pre('save', function hasSlug() {
  if (this.isModified('title')) return;
  this.slug = slugify(this.title, { lower: true, strict: true });
});
*/
const Post = mongoose.model('Post', postSchema);

export default Post;
