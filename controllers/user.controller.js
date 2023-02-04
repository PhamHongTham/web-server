import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

export const userController = {
  getPostsOfUser: async (req, res) => {
    const id = req.params.id === 'me' ? req.user._id : req.params.id;
    try {
      if (!id) {
        return res.status(400).send({
          code: 400,
          message: 'Bad Request',
        });
      }

      const posts = await Post.find({ user: id }).select('_id title content description status tags createdAt cover');
      const user = await User.findById(id).select('_id displayName picture followers followings').lean();
      if (!user) {
        return res.status(403).send({
          code: 400,
          message: 'User not found',
        });
      }
      let isfollowed = false;
      if (req.params.id !== 'me' && req.user) {
        isfollowed = user.followers.map(item => item.toHexString()).indexOf(req.user._id) > -1;
      }

      if (!posts || !user) {
        return res.status(403).send({
          code: 403,
          message: 'Something went wrong',
        });
      }

      res.send({
        user: {
          ...user,
          isfollowed,
          followers: user.followers.length,
          followings: user.followings.length,
        },
        posts
      });
    } catch (error) {
      res.status(500).send({
        message: error?.message || 'Server Error',
      });
    }
  }
};
