import express from "express";
import passport from "passport";
import { authController } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// authRouter.post('/register', authController.register);
// authRouter.post('/login', authController.login);
// authRouter.put('/change-password', isAuth, authController.changePassword);
// authRouter.get('/users/:id', authController.getInfoUser);
// authRouter.put('/users/:id', isAuth, authController.updateInfo);

authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get(
  "/google/callback",
  passport.authenticate('google', { scope: ['profile', 'email'] }),
  authController.loginWithGoogle
);

export default authRouter;
