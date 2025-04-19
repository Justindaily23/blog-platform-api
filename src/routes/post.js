import express from 'express';
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  undoLikeDislike,
} from '../controllers/post.js';
import auth from '../middleware/auth.js';

const router = express();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.post('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.post('/:id/like', auth, likePost);
router.post('/:id/dislike', auth, dislikePost);
router.post('/:id/undo', auth, undoLikeDislike);

export default router;
