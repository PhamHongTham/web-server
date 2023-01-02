import express from "express";
import { authController } from "../controllers/auth.controller.js";

const userRouter = express.Router();

userRouter.post('/register', authController.register);
userRouter.post('/login', authController.login);
userRouter.put('/change-password', authController.changePassword);
userRouter.get('/users/:id', authController.getInfoUser);
userRouter.put('/users/:id', authController.updateInfo);

export default userRouter;
