import { Response } from "express";
import { HttpStatus, HttpStatusMessage, HttpStatusCode } from "../constants/httpStatus";


export class ResponseHandler {

    public static success(res: Response, status: HttpStatusCode, data?: any, messsage?: string) {
        
        res.status(status).json({
            code: status,
            messsage: messsage || HttpStatusMessage[status],
            data,
        });
    }


    public static error(res: Response, status: HttpStatusCode, messsage?: string, data?: any) {

        res.status(status).json({
            code: status,
            message: messsage || HttpStatusMessage[status],
            error: data || null,
        });
    }
}