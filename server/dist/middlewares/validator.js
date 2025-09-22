"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const zod_1 = require("zod");
const apiError_1 = require("../utils/apiError");
const httpStatus_1 = require("../constants/httpStatus");
class Validator {
    static validate(schema) {
        return (req, res, next) => {
            try {
                schema.parse({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });
                next();
            }
            catch (err) {
                if (err instanceof zod_1.ZodError) {
                    const errors = err.errors.map((e) => e.message).join(", ");
                    next(new apiError_1.ApiError(errors, httpStatus_1.HttpStatus.BAD_REQUEST));
                }
                else {
                    next(err);
                }
            }
        };
    }
}
exports.Validator = Validator;
