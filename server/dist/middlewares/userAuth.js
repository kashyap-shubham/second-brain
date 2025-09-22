"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = userAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiError_1 = require("../utils/apiError");
const httpStatus_1 = require("../constants/httpStatus");
function userAuth(req, res, next) {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        if (!token) {
            throw new apiError_1.ApiError("Authentication token missing", httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new apiError_1.ApiError("Jwt secret not configured", httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            next(new apiError_1.ApiError("Token Expired", httpStatus_1.HttpStatus.UNAUTHORIZED));
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            next(new apiError_1.ApiError("Invalid Token", httpStatus_1.HttpStatus.UNAUTHORIZED));
        }
        else {
            next(new apiError_1.ApiError("Authentication Failed", httpStatus_1.HttpStatus.UNAUTHORIZED));
        }
    }
}
