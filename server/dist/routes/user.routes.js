"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const validator_1 = require("../middlewares/validator");
const user_schema_1 = require("../schema/user.schema");
const user_service_1 = require("../services/user.service");
const userRouter = express_1.default.Router();
const userService = new user_service_1.UserService();
const userController = new user_controller_1.UserController(userService);
// @route  POST /api/v1/user/signup
// @desc signup new user
userRouter.route("/signup").post(validator_1.Validator.validate(user_schema_1.signupSchema), userController.signup);
// @route Post /api/v1/user/sigin
// @desc sinin registered users
userRouter.route("/signin").post(validator_1.Validator.validate(user_schema_1.signinSchema), userController.signin);
exports.default = userRouter;
