import express from "express";
import { authController } from "../controllers/auth.controller.js";

const userRouter = express.Router();

userRouter.post('/register', authController.register);

export default userRouter;
