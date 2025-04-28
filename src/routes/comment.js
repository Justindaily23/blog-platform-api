// routes/comment.js
import express from 'express';
import {
  createComment,
  getComments,
  likeComment,
  dislikeComment,
  undoLikeDislikeComment,
  deleteComment,
} from '../controllers/comment.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public: Get comments for a post
router.get('/', getComments);

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - postId
 *             properties:
 *               content:
 *                 type: string
 *                 example: Great post!
 *               postId:
 *                 type: string
 *                 example: 1234567890abcdef12345678
 *     responses:
 *       201:
 *         description: Comment created
 *       401:
 *         description: Unauthorized
 */

// Auth: Create a comment
router.post('/', auth, createComment);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get comments for a post
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: List of comments
 */
router.get('/', getComments);

/**
 * @swagger
 * /comments/{id}/like:
 *   post:
 *     summary: Like a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment liked
 */
router.post('/:id/like', auth, likeComment);

/**
 * @swagger
 * /comments/{id}/dislike:
 *   post:
 *     summary: Dislike a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment disliked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 dislikes:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
router.post('/:id/dislike', auth, dislikeComment);

/**
 * @swagger
 * /comments/{id}/undo:
 *   post:
 *     summary: Undo like or dislike on a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Like/dislike undone
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 likes:
 *                   type: array
 *                   items:
 *                     type: string
 *                 dislikes:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
router.post('/:id/undo', auth, undoLikeDislikeComment);

/**
 * @swagger
 * /comments/{id}/delete:
 *   delete:
 *     summary: Delete a comment (author/admin only)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized
 */
router.delete('/:id/delete', auth, deleteComment);

export default router;
