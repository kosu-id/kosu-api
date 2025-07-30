import type { NextFunction, Request, Response } from "express";
import z4 from "zod/v4";

import { UnprocessableEntityException } from "../exceptions";

export function validateBody(schema: z4.ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      next(
        new UnprocessableEntityException(
          "Invalid request body",
          z4.flattenError(result.error).fieldErrors
        )
      );
    }

    next();
  };
}

export function validateParams(schema: z4.ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse(req.params);
  
      if (!result.success) {
        next(
          new UnprocessableEntityException(
            "Invalid route parameters",
            z4.flattenError(result.error).fieldErrors
          )
        );
      }
  
      next();
    };
  }

export function validateQuery(schema: z4.ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      next(
        new UnprocessableEntityException(
          "Invalid query parameters",
          z4.flattenError(result.error).fieldErrors
        )
      );
    }

    next();
  };
}