import { Post } from "../models/post.model";

export const userController = {
  getPostsOfUser: async (req, res) => {
    const id = req.params.id;
    try {
      const posts = await Post.find({ userId: id });
      res.status(200).send(posts);
    } catch (error) {
      res.status(500).send({
        message: 'Server Error',
      });
    }
  }
};
