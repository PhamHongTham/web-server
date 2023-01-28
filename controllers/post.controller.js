import { Post } from "../models/post.model";
import { User } from "../models/user.model";
import { SECRET_ACCESS_TOKEN } from '../config/constant.js';
import { verifyToken } from '../helper/index.js'
import { Comment } from "../models/comment.model";
import { INFO_USER } from "../constants";

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
        tags: req.body.tags,
        status: req.body.status || 'public',
        user: req.user._id,
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

      if (req.user._id !== post.user.toHexString()) {
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

      if (req.user._id !== post.user.toHexString()) {
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
  },
  likePost: async (req, res) => {
    try {
      const id = req.params.id;
      const post = await Post.findById(id);

      if (!post) {
        return res.status(403).send({
          code: 403,
          message: 'Post not found',
        });
      }

      if (req.user._id !== post.user.toHexString()) {
        return res.status(401).send({ code: 401, message: 'Authentication failed' });
      }

      let index = post.likes.indexOf(req.user._id);
      if (index > -1) {
        post.likes.splice(index, 1);
      } else {
        post.likes.push(req.user._id);
      }

      post.save((err) => {
        if (err) {
          return res.status(400).send({
            code: 400,
            message: 'Some thing went wrong',
          });
        }
        return res.status(200).send({
          isLiked: index > -1 ? false : true,
        });
      })

    } catch (error) {
      res.status(500).send({
        message: 'Server Error',
      });
    }
  },
  getDetailPost: async (req, res) => {
    const id = req.params.id;
    const token = req.headers.authorization;
    const decoded = await verifyToken(token, SECRET_ACCESS_TOKEN);

    try {
      const post = await Post.findById(id).lean();
      if (!post) {
        return res.status(403).send({
          code: 403,
          message: 'Post not found',
        });
      }
      const author = await User.findById(post.user);
      const userRequest = await User.findById(decoded._id);
      let isInBookmark = false;
      let isFollowed = false;
      let isLiked = false;

      if (token) {
        isLiked = post.likes.some(id => id.equals(userRequest._id));
        isFollowed = author.followers.some(id => id.equals(userRequest._id));
        isInBookmark = userRequest.bookmarks.some(id => id.equals(post._id));
      }

      return res.status(200).send({
        ...post,
        user: author,
        isInBookmark,
        isFollowed,
        isLiked,
      });
    } catch (error) {
      res.status(500).send({
        message: 'Server Error',
      });
    }
  },

  // comments
  createComment: async (req, res) => {
    const id = req.params.id;
    const { content } = req.body;

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

      const newComment = new Comment({
        content,
        user: req.user._id,
      });

      newComment.save((err) => {
        if (err) {
          return res.status(400).send({
            code: 400,
            message: err.message,
          });
        }
        post.comments.push(newComment._id);
        post.save();
        return res.status(200).send(newComment);
      })
    } catch (error) {
      res.status(500).send({
        message: 'Server Error',
      });
    }
  },
  getCommentsOfPost: async (req, res) => {
    const id = req.params.id;
    try {
      if (!id) {
        return res.status(400).send({
          code: 400,
          message: 'Bad Request',
        });
      }
      const post = await Post.findById(id).populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: '_id displayName lastName email picture',
          model: 'User',
        }
      });

      if (!post) {
        return res.status(403).send({
          code: 403,
          message: 'Post not found',
        });
      }
      res.status(200).send(post.comments);
    } catch (error) {
      res.status(500).send({
        message: 'Server Error',
      });
    }
  },

  // List post public
  getRecommendPost: async (req, res) => {
    const pageNumber = req.query.page || 1;
    const pageSize = req.query.size || 10;
    try {
      const data = await Post.find()
      .sort({ likes: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .populate('user', INFO_USER);

      res.send(data || []);
    } catch (error) {
      res.status(500).send({
        message: 'Server Error',
      });
    }
  },
  getPublicPost: async (req, res) => {
    const pageNumber = req.query.page || 1;
    const pageSize = req.query.size || 10;
    try {
      const posts = await Post.find({ status: 'public' })
      .sort({ likes: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .populate('user', INFO_USER)
      .lean();

      const postsMapping = posts.map((post) => {
        return {
          ...post,
          likes: post.likes.length,
          comments: post.comments.length
        };
      });
      const hasMore = postsMapping.length === +pageSize;
      const jsonData = {
        data: postsMapping || [],
        hasMore
      };

      res.send(jsonData);
    } catch (error) {
      res.status(500).send({
        message: 'Server Error',
      });
    }
  },
};
