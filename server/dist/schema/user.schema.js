"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// signup schema 
exports.signupSchema = zod_1.default.object({
    body: zod_1.default.object({
        userName: zod_1.default.string().min(3, "UserName must be atleast 3 characters"),
        email: zod_1.default.string().email("Invalid email address"),
        password: zod_1.default.string().min(6, "Password must be atleast 6 characters long"),
    }),
});
// signin schema
exports.signinSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default.string().email("Invalid email address"),
        password: zod_1.default.string().min(6, "Password must be atleast 6 character long"),
    }),
});
