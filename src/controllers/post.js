import slugify from 'slugify';
import Post from '../models/post.js';

// Create post (author/admin only)
export const createPost = async (req, res) => {
  try {
    const { title, content, status, image } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        message: 'Insert Title and Content',
      });
    }
    const slug = slugify(title, { lower: true, strict: true });

    const post = new Post({
      title,
      content,
      status: status || 'draft',
      image: image || null,
      slug,
      author: req.user.id,
    });
    await post.save();
    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get all posts (public)
export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ status: 'published' })
      .populate('author', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments({ status: 'published' });

    return res.status(200).json({
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get single Post
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      'author',
      'username email'
    );
    if (!post || post.status !== 'published') {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update post ( author/admin only)
export const updatePost = async (req, res) => {
  try {
    const { title, content, status } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const slug = slugify(title, { lower: true, strict: true });

    post.title = title || post.title;
    post.content = content || post.content;
    post.status = status || post.status;
    post.slug = slug;
    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await post.deleteOne();
    return res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
