import slugify from 'slugify';
import Category from '../models/category.js';

export const createCategory = async (req, res) => {
  try {
    if (!['admin', 'author'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Extract the name from the request body.
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Category name required' });
    }

    // Check for duplicates
    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: 'Category already exists' });
    }

    const slug = slugify(name, { lower: true, strict: true });

    // Creates a new instance of the Category model using the provided name.
    const category = new Category({ name, slug });
    await category.save();
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
