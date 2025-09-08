import express from "express";
import { userController } from "../controllers/user.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/me", authMiddleware, userController.me);   

export default userRouter;
