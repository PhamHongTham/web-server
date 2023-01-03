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
        userId: req.user._id,
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
  updatePost: async (req, res) => {
    const id = req.params.id;

    try {
      if (!req.body) {
        return res.status(400).send({
          code: 400,
          message: 'Bad Request',
        });
      }
      const post = await Post.findById(id);
      if (!post) {
        return res.status(403).send({
          code: 403,
          message: 'Post not found',
        });
      }

      if (req.user._id !== post.userId.toHexString()) {
        return res.status(401).send({ code: 401, message: 'Authentication failed' });
      }

      post.title = req.body.title;
      post.description = req.body.description;
      post.content = req.body.content;
      post.cover = req.body.cover;
      
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
  deletePost: async (req, res) => {
    try {
      const id = req.params.id;
      const post = await Post.findById(id);

      if (!post) {
        return res.status(403).send({
          code: 403,
          message: 'Post not found',
        });
      }

      if (req.user._id !== post.userId.toHexString()) {
        return res.status(401).send({ code: 401, message: 'Authentication failed' });
      }

      post.deleteOne((err) => {
        if (err) {
          return res.status(400).send({
            code: 400,
            message: 'Some thing went wrong',
          });
        }
        return res.status(200).send({
          message: 'Deleted post'
        });
      })
    } catch (error) {
      res.status(500).send({
        message: 'Server Error',
      });
    }
  }
};
