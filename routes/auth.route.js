import express from "express";
import { authController } from "../controllers/auth.controller.js";

const userRouter = express.Router();

userRouter.post('/register', authController.register);
userRouter.post('/login', authController.login);

export default userRouter;
