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

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post (author/admin only)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - status
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Post
 *               content:
 *                 type: string
 *                 example: Hello, world!
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *               category:
 *                 type: string
 *                 example: 1234567890abcdef12345678
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["test"]
 *     responses:
 *       201:
 *         description: Post created
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized
 */
router.post('/', auth, createPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get published posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: Filter by tag
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/', getPosts);

router.get('/:id', getPost);
router.post('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.post('/:id/like', auth, likePost);
router.post('/:id/dislike', auth, dislikePost);
router.post('/:id/undo', auth, undoLikeDislike);

export default router;
