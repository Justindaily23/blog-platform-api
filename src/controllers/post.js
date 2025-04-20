import slugify from 'slugify';
import Post from '../models/post.js';
// import Category from '../models/category.js';

// Create post (author/admin only)
export const createPost = async (req, res) => {
  try {
    // Check if user is an author or an admin
    if (req.user.role !== 'author' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Insert content to database
    const { title, content, status, image, category, tags } = req.body;
    if (!title || !content || !category) {
      return res.status(400).json({
        message: 'Title, Content and Category is required',
      });
    }
    const slug = slugify(title, { lower: true, strict: true });

    const post = new Post({
      title,
      content,
      status: status || 'draft',
      image: image || null,
      slug,
      category,
      tags: tags || [],
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
    // Get pagination information from the url
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Check filters
    const { category, tag } = req.query;

    const query = { status: 'published' };
    if (category) query.category = category;
    if (tag) query.tags = tag;

    // Fetch posts from the database
    const posts = await Post.find({ status: 'published' })
      .populate('author', 'username email')
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // const total = await Post.countDocuments(query);
    const total = await Post.countDocuments(query);

    // const postObj = post.toObject(); // Mongoose method
    return res.status(200).json({
      posts: posts.map((post) => {
        const postObj = post.toObject(); // Converts Mongoose document to plain object
        return {
          ...postObj,
          likes: post.likedBy.length,
          dislikes: post.dislikedBy.length,
        };
      }),
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

    // auto create slug from the tile
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

// like a post logic
export const likePost = async (req, res) => {
  try {
    // find post by id
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // check if post is already liked
    if (post.likedBy.map((id) => id.toString()).includes(req.user.id)) {
      return res.status(400).json({ message: 'Already liked' });
    }

    // if post been liked already then avoid it from being disliked simultaneouslys
    if (post.dislikedBy.map((id) => id.toString()).includes(req.user.id)) {
      post.dislikedBy.pull(req.user.id);
    }

    // Populate the likedBy field with the id who likes the post
    post.likedBy.addToSet(req.user.id); // won't duplicate
    await post.save();
    return res
      .status(200)
      .json({ message: 'Post liked', likedBy: post.likedBy });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// dislike a post logic
export const dislikePost = async (req, res) => {
  try {
    // check for post
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // check if post is already disliked
    if (post.dislikedBy.map((id) => id.toString()).includes(req.user.id)) {
      return res.status(400).json({ message: 'Already disliked' });
    }

    // since post is disliked, prevent it from being liked simultaneosuly
    if (post.likedBy.map((id) => id.toString()).includes(req.user.id)) {
      post.likedBy.pull(req.user.id);
    }

    // populate the disliked field with the id who disliked
    post.dislikedBy.addToSet(req.user.id); // won't duplicate
    await post.save();
    return res.status(200).json({
      message: 'Post disliked',
      dislikedBy: post.dislikedBy,
      likes: post.likedBy.length,
      dislikes: post.dislikedBy.length,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// undo either a liked or disliked post
export const undoLikeDislike = async (req, res) => {
  try {
    // Get a post by Id
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Get the id of the liked and remove from the likedBy array
    if (post.likedBy.map((id) => id.toString()).includes(req.user.id)) {
      post.likedBy.pull(req.user.id);
      await post.save();
      return res.status(200).json({
        message: 'Like removed',
        likes: post.likedBy.length,
        dislikes: post.dislikedBy.length,
      });
    }

    // Get the id of the disliked post remove from the likedBy array
    if (post.dislikedBy.map((id) => id.toString()).includes(req.user.id)) {
      post.dislikedBy.pull(req.user.id);
      await post.save();
      return res.status(200).json({
        message: 'Dislike removed',
        likes: post.likedBy.length,
        dislikes: post.dislikedBy.length,
      });
    }
    return res.status(400).json({ message: 'No like or dislike to undo' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
