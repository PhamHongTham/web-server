import express from "express";
import { friendController } from "../controllers/friend.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const friendRouter = express.Router();

friendRouter.post('/follow', isAuth, friendController.followUser);
friendRouter.get('/:id/followers', friendController.getFollowers);
friendRouter.get('/:id/followings', friendController.getFollowings);

export default friendRouter;
