import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { ApiError } from "../utils/apiError";
import { HttpStatus } from "../constants/httpStatus";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.errors.map((e) => e.message).join(", ");
        next(new ApiError(errors, HttpStatus.BAD_REQUEST));
      } else {
        next(err);
      }
    }
  };
