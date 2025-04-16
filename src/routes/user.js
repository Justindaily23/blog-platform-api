import express from 'express';
import { register, login } from '../controllers/user.js';
import getProfile from '../controllers/profile.js';
import auth from '../middleware/auth.js';

const router = express();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getProfile);

export default router;
