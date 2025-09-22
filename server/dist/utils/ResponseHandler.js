"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
const httpStatus_1 = require("../constants/httpStatus");
class ResponseHandler {
    static success(res, status, data, message) {
        res.status(status).json({
            code: status,
            messsage: message || httpStatus_1.HttpStatusMessage[status],
            data,
        });
    }
    static error(res, status, message, data) {
        res.status(status).json({
            code: status,
            message: message || httpStatus_1.HttpStatusMessage[status],
            error: data || null,
        });
    }
}
exports.ResponseHandler = ResponseHandler;
