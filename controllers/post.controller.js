import { Post } from "../models/post.model";

export const postController = {
  createPost: async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).send({
          code: 400,
          message: 'Bad Request',
        });
      }
  
      const post = new Post({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        cover: req.body.cover,
      });
      post.save((err) => {
        if (err) {
          return res.status(400).send({
            code: 400,
            message: err.message,
          });
        }
        return res.status(200).send(post);
      })
    } catch (error) {
      res.status(500).send({
        message: 'Server Error',
      });
    }
  },
};