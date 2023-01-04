import express from "express";
import { authController } from "../controllers/auth.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.put('/change-password', isAuth, authController.changePassword);
authRouter.get('/users/:id', authController.getInfoUser);
authRouter.put('/users/:id', isAuth, authController.updateInfo);

export default authRouter;
