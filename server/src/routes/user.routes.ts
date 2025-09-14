import express from "express";
import { UserController} from "../controllers/user.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRouter = express.Router();


const userService = new UserService();
const userController = new UserController(userService);


// @route  POST /api/v1/user/signup
// @desc signup new user
userRouter.route("/signup").post(validate(signupSchema), userController.signup);


// @route Post /api/v1/user/sigin
// @desc sinin registered users
userRouter.route("/signin").post(validate(signinSchema), userController.signin)





export default userRouter;
