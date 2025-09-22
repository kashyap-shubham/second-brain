"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const httpStatus_1 = require("../constants/httpStatus");
const ResponseHandler_1 = require("../utils/ResponseHandler");
class UserController {
    constructor(userServices) {
        this.userServices = userServices;
        this.signup = this.signup.bind(this);
        this.signin = this.signin.bind(this);
    }
    // signup controller
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, userName } = req.body;
                const user = yield this.userServices.createUser({ email, password, userName });
                ResponseHandler_1.ResponseHandler.success(res, httpStatus_1.HttpStatus.CREATED, {
                    id: user._id,
                    email: user.email,
                    userName: user.userName
                }, "User Created successfully");
            }
            catch (error) {
                next(error);
            }
        });
    }
    // signin controller
    signin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield this.userServices.authenticateUser(email, password);
                ResponseHandler_1.ResponseHandler.success(res, httpStatus_1.HttpStatus.OK, { token }, "Login Successful");
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
