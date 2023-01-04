import express from "express";
import { postController } from "../controllers/post.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const postRouter = express.Router();

postRouter.get('/:id', postController.getDetailPost);
postRouter.post('/', isAuth, postController.createPost);
postRouter.put('/:id', isAuth, postController.updatePost);
postRouter.delete('/:id', isAuth, postController.deletePost);

// Like
postRouter.put('/:id/likes', isAuth, postController.likePost);

export default postRouter;
