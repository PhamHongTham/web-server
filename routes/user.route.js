import express from "express";
import { userController } from "../controllers/user.controller.js";
import { authController } from "../controllers/auth.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post('/register', authController.register);
userRouter.post('/login', authController.login);
userRouter.put('/change-password', isAuth, authController.changePassword);
userRouter.get('/me',isAuth, authController.getInfoUserMe);
userRouter.get('/:id', authController.getInfoUser);
userRouter.put('/:id', isAuth, authController.updateInfo);

userRouter.get('/:id/posts', isAuth, userController.getPostsOfUser);

export default userRouter;
