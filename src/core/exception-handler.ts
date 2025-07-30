import type { Application, NextFunction, Request, Response } from "express";

import { IS_PRODUCTION } from "@local/common/constants";
import { Exception } from "@local/common/exceptions";
import { StatusCodes } from "http-status-codes";

export default class ExceptionHandler {
  static bind(app: Application) {
    app.use(this.handleError);
  }

  private static handleError(
    err: Exception | Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) {
    if (err instanceof Exception) {
      return res.status(err.code).json({
        error: ExceptionHandler.formatError(
          err.message,
          err.details,
          err.stack
        ),
      });
    }

    if (err instanceof SyntaxError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: ExceptionHandler.formatError(
          "Invalid JSON format",
          err.message,
          err.stack
        ),
      });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ExceptionHandler.formatError(
        "An unexpected error occurred",
        err.message,
        err.stack
      ),
    });
  }

  private static formatError(message: string, details: string, stack?: string) {
    return {
      message,
      details,
      stack: IS_PRODUCTION ? null : stack,
    };
  }
}
