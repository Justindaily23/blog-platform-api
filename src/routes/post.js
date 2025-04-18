import express from 'express';
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from '../controllers/post.js';
import auth from '../middleware/auth.js';

const router = express();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.post('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

export default router;
