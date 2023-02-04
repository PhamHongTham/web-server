import express from "express";
import { uploadController } from "../controllers/upload.controller.js";
import { upload } from "../helper/index.js";
import { isAuth } from "../middleware/auth.middleware.js";

const uploadRouter = express.Router();

uploadRouter.post('/image', isAuth, upload.single("image"), uploadController.uploadImage);

export default uploadRouter;
