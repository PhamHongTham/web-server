import express from "express";
import { userController } from "../controllers/user.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

// post of user
userRouter.get('/:id/posts', isAuth, userController.getPostsOfUser);

export default userRouter;
