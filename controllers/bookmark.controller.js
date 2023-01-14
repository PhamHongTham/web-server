import { Post } from "../models/post.model";
import { User } from "../models/user.model";

export const bookmarkController = {
  addBookmark: async (req, res) => {
    try {
      if (!req.body.postId) {
        return res.status(400).send({
          code: 400,
          message: 'Bad Request',
        });
      }

      const post = await Post.findById(req.body.postId);
      const user = await User.findById(req.user._id);
      if (!post) {
        return res.status(403).send({
          code: 403,
          message: 'Post not found',
        });
      }

      let index = user.bookmarks.indexOf(post._id);
      if (index > -1) {
        user.bookmarks.splice(index, 1);
      } else {
        user.bookmarks.push(post._id);
      }
      await user.save();
      res.status(200).send({
        isInBookmark: index > -1 ? false : true
      });
    } catch (error) {
      res.status(500).send({
        message: 'Server Error',
      });
    }
  },
  getBookmarkUser: async (req, res) => {
    try {
      const posts = await User.findById(req.user._id).populate('bookmarks');
      if (!posts) {
        return res.status(403).send({
          code: 403,
          message: 'Something went wrong',
        });
      }
      res.status(200).send({
        post: posts.bookmarks || [],
      });
    } catch (error) {
      res.status(500).send({
        message: 'Server Error',
      });
    }
  },
};
