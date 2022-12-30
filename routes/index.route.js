import userRouter from "./auth.route.js";

export const routes = (app) => {
  app.use('/api/auth', userRouter);
};
