import userRouter from "./auth.route.js";
import postRouter from "./post.route.js";

export const routes = (app) => {
  app.use('/api/auth', userRouter);
  app.use('/api/posts', postRouter);
};
