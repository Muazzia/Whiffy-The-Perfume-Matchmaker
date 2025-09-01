import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { sendError } from "../utils/response";

export const validate =
  (schema: ObjectSchema, property: "body" | "query" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      return sendError(
        res,
        error.details.map((d) => d.message),
        "Validation failed",
        400
      );
    }

    next();
  };
