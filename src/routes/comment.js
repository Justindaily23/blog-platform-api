// routes/comment.js
import express from 'express';
import {
  createComment,
  getComments,
  likeComment,
  dislikeComment,
  undoLikeDislikeComment,
} from '../controllers/comment.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public: Get comments for a post
router.get('/', getComments);
// Auth: Create a comment
router.post('/', auth, createComment);
// Auth: Like, dislike, undo
router.post('/:id/like', auth, likeComment);
router.post('/:id/dislike', auth, dislikeComment);
router.post('/:id/undo', auth, undoLikeDislikeComment);

export default router;
