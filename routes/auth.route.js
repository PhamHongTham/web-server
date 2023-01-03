import express from "express";
import { authController } from "../controllers/auth.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post('/register', authController.register);
userRouter.post('/login', authController.login);
userRouter.put('/change-password', isAuth, authController.changePassword);
userRouter.get('/users/:id', authController.getInfoUser);
userRouter.put('/users/:id', isAuth, authController.updateInfo);

export default userRouter;
