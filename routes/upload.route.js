import express from "express";
import { uploadController } from "../controllers/upload.controller";
import { upload } from "../helper/index.js";
import { isAuth } from "../middleware/auth.middleware";

const uploadRouter = express.Router();

uploadRouter.post('/image', isAuth, upload.single("image"), uploadController.uploadImage);

export default uploadRouter;
