import express from "express";
import { bookmarkController } from "../controllers/bookmark.controller.js";
import { isAuth } from "../middleware/auth.middleware";

const bookmarkRouter = express.Router();

bookmarkRouter.post('/', isAuth, bookmarkController.addBookmark);
bookmarkRouter.get('/', isAuth, bookmarkController.getBookmarkUser);

export default bookmarkRouter;
