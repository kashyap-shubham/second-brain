export class ApiError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor(message: string, statuscode: number, isOperational = true) {
        super(message);
        this.statusCode = statuscode;
        this.isOperational = isOperational;


        Error.captureStackTrace(this, this.constructor);
    }
}