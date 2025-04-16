import User from '../models/user.js';

const getProfile = async (req, res) => {
  try {
    // check user details excluding password
    const user = await User.findById(req.user.id).select('-password'); // excludes password
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
    });
  }
};

export default getProfile;
