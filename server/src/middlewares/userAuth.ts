import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import { ApiError } from "../utils/apiError";
import { HttpStatus } from "../constants/httpStatus";


export interface JwtUserPayload extends JwtPayload {
  id: string;
  email: string;
}


export interface AuthRequest extends Request {
    user?: JwtPayload | string;
}


export function userAuth(req: AuthRequest, res: Response, next: NextFunction): void {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader?.split(" ")[1];

        if (!token) {
            throw new ApiError("Authentication token missing", HttpStatus.UNAUTHORIZED);
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new ApiError("Jwt secret not configured", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const decoded = jwt.verify(token, secret);
        req.user = decoded;

        next();
    } catch(error) {
        if (error instanceof jwt.TokenExpiredError) {
            next(new ApiError("Token Expired", HttpStatus.UNAUTHORIZED));
        } 
        else if (error instanceof jwt.JsonWebTokenError) {
            next(new ApiError("Invalid Token", HttpStatus.UNAUTHORIZED));
        }
        else {
            next(new ApiError("Authentication Failed", HttpStatus.UNAUTHORIZED));
        }
    }
}