import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Welcome to My Blog. Lets Build Something Unique.' });
});

export default router;
