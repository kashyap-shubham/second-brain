import express from "express";
import { UserController} from "../controllers/user.controller";
import { Validator } from "../middlewares/validator";
import { signinSchema, signupSchema } from "../schema/user.schema";
import { UserService } from "../services/user.service";

const userRouter = express.Router();


const userService = new UserService();
const userController = new UserController(userService);


// @route  POST /api/v1/user/signup
// @desc signup new user
userRouter.route("/signup").post(Validator.validate(signupSchema), userController.signup);


// @route Post /api/v1/user/sigin
// @desc sinin registered users
userRouter.route("/signin").post(Validator.validate(signinSchema), userController.signin)





export default userRouter;
