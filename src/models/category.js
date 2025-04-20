import mongoose from 'mongoose';
// import slugify from 'slugify';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      unique: true,
      maxlength: [50, 'Category name cannot exceed 50 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

/*
categorySchema.pre('save', function hasCategory() {
  if (this.isModified('name')) return;
  this.slug = slugify(this.name, { lower: true, strict: true });
});
*/
const Category = mongoose.model('Category', categorySchema);

export default Category;
