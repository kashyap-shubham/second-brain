import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../constants/httpStatus";
import { ResponseHandler } from "../utils/ResponseHandler";


export class ErrorHandler {
    public static handle(err: any, req: Request, res: Response, next: NextFunction) {

        console.error(err);

        const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
        const message = err.message || "Something went wrong";

        ResponseHandler.error(res, status, message, err.data || null);

    }
}