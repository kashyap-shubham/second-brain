"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const httpStatus_1 = require("../constants/httpStatus");
const ResponseHandler_1 = require("../utils/ResponseHandler");
class ErrorHandler {
    static handle(err, req, res, next) {
        console.error(err);
        const status = err.status || httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = err.message || "Something went wrong";
        ResponseHandler_1.ResponseHandler.error(res, status, message, err.data || null);
    }
}
exports.ErrorHandler = ErrorHandler;
