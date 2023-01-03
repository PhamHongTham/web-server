import express from "express";
import { postController } from "../controllers/post.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const postRouter = express.Router();

postRouter.post('/', isAuth, postController.createPost);
postRouter.put('/:id', isAuth, postController.updatePost);

export default postRouter;
