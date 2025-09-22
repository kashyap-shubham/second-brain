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
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
const apiError_1 = require("../utils/apiError");
const httpStatus_1 = require("../constants/httpStatus");
class UserService {
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield user_model_1.User.findOne({ email: data.email });
            if (existingUser) {
                throw new apiError_1.ApiError("User with this email already exists", httpStatus_1.HttpStatus.CONFLICT);
            }
            const user = new user_model_1.User(data);
            yield user.save();
            return user;
        });
    }
    authenticateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({ email });
            if (!user) {
                throw new apiError_1.ApiError("Invalid credentials", httpStatus_1.HttpStatus.UNAUTHORIZED);
            }
            const isMatch = yield user.comparePassword(password);
            if (!isMatch) {
                throw new apiError_1.ApiError("Invalid credentials", httpStatus_1.HttpStatus.UNAUTHORIZED);
            }
            return user.generateAuthToken();
        });
    }
}
exports.UserService = UserService;
