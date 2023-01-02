import express from "express";
import { postController } from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.post('/', postController.createPost);

export default postRouter;
