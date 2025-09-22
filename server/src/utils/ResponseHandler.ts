import { Response } from "express";
import { HttpStatusMessage, HttpStatusCode } from "../constants/httpStatus";


export class ResponseHandler {

    public static success(res: Response, status: HttpStatusCode, data?: any, message?: string) {
        
        res.status(status).json({
            code: status,
            messsage: message || HttpStatusMessage[status],
            data,
        });
    }


    public static error(res: Response, status: HttpStatusCode, message?: string, data?: any) {

        res.status(status).json({
            code: status,
            message: message || HttpStatusMessage[status],
            error: data || null,
        });
    }
}