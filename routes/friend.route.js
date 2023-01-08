import express from "express";
import { friendController } from "../controllers/friend.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const friendRouter = express.Router();

friendRouter.post('/follow', isAuth, friendController.followUser);

export default friendRouter;
