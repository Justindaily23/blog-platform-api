import Comment from '../models/comment.js';

// Create a comment (authenticated users)
export const createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    if (!content || !postId) {
      return res.status(400).json({ message: 'Content and postId required' });
    }
    const comment = new Comment({
      content,
      post: postId,
      author: req.user.id,
    });
    await comment.save();
    return res.status(201).json(comment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// List comments for a post (public)
export const getComments = async (req, res) => {
  try {
    const { postId } = req.query;
    if (!postId || typeof postId !== 'string') {
      return res.status(400).json({ message: 'Valid postId required' });
    }

    const cleanPostId = postId.trim();

    const comments = await Comment.find({ post: cleanPostId })
      .populate('author', 'email')
      .sort({ createdAt: -1 })
      .lean() // Convert to plain JS for modification
      .then((fetchedcomments) =>
        fetchedcomments.map((comment) => ({
          ...comment,
          likes: comment.likedBy.length,
          dislikes: comment.dislikedBy.length,
        }))
      );
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Like a comment (authenticated users)
export const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (comment.likedBy.map((id) => id.toString()).includes(req.user.id)) {
      return res.status(400).json({ message: 'Already liked' });
    }
    if (comment.dislikedBy.map((id) => id.toString()).includes(req.user.id)) {
      comment.dislikedBy.pull(req.user.id);
    }
    comment.likedBy.addToSet(req.user.id);
    await comment.save();
    return res.status(200).json({
      message: 'Comment liked',
      likes: comment.likedBy.length,
      dislikes: comment.dislikedBy.length,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Dislike a comment (authenticated users)
export const dislikeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (comment.dislikedBy.map((id) => id.toString()).includes(req.user.id)) {
      return res.status(400).json({ message: 'Already disliked' });
    }
    if (comment.likedBy.map((id) => id.toString()).includes(req.user.id)) {
      comment.likedBy.pull(req.user.id);
    }
    comment.dislikedBy.addToSet(req.user.id);
    await comment.save();
    return res.status(200).json({
      message: 'Comment disliked',
      likes: comment.likedBy.length,
      dislikes: comment.dislikedBy.length,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Undo like/dislike (authenticated users)
export const undoLikeDislikeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (comment.likedBy.map((id) => id.toString()).includes(req.user.id)) {
      comment.likedBy.pull(req.user.id);
      await comment.save();
      return res.status(200).json({
        message: 'Like removed',
        likes: comment.likedBy.length,
        dislikes: comment.dislikedBy.length,
      });
    }
    if (comment.dislikedBy.map((id) => id.toString()).includes(req.user.id)) {
      comment.dislikedBy.pull(req.user.id);
      await comment.save();
      return res.status(200).json({
        message: 'Dislike removed',
        likes: comment.likedBy.length,
        dislikes: comment.dislikedBy.length,
      });
    }
    return res.status(400).json({ message: 'No like or dislike to undo' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
