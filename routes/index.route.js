import authRouter from "./auth.route.js";
import bookmarkRouter from "./bookmark.route.js";
import friendRouter from "./friend.route.js";
import postRouter from "./post.route.js";
import uploadRouter from "./upload.route.js";
import userRouter from "./user.route.js";

export const routes = (app) => {
  // app.use('/api/auth', authRouter);
  app.use('/api/posts', postRouter);
  app.use('/api/users', userRouter);
  app.use('/api/friends', friendRouter);
  app.use('/api/bookmarks', bookmarkRouter);
  app.use('/api/upload', uploadRouter);
};
