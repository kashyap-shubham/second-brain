"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusMessage = exports.HttpStatus = void 0;
exports.HttpStatus = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};
exports.HttpStatusMessage = {
    [exports.HttpStatus.OK]: "OK",
    [exports.HttpStatus.CREATED]: "Created",
    [exports.HttpStatus.BAD_REQUEST]: "Bad Request",
    [exports.HttpStatus.UNAUTHORIZED]: "Unauthorized",
    [exports.HttpStatus.FORBIDDEN]: "Forbidden",
    [exports.HttpStatus.NOT_FOUND]: "Not Found",
    [exports.HttpStatus.CONFLICT]: "Conflict",
    [exports.HttpStatus.INTERNAL_SERVER_ERROR]: "Internal Server Error",
};
