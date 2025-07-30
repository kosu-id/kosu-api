import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class Exception extends Error {
  constructor(
    message: string = "Something went wrong!",
    public name: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    public code: number = StatusCodes.INTERNAL_SERVER_ERROR,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public details?: any
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AppErrorException extends Exception {
  constructor(
    message: string = "Application Error",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details?: any
  ) {
    super(
      message,
      ReasonPhrases.INTERNAL_SERVER_ERROR,
      StatusCodes.INTERNAL_SERVER_ERROR,
      details
    );
  }
}

export class BadRequestException extends Exception {
  constructor(
    message: string = "Bad Request",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details?: any
  ) {
    super(message, ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST, details);
  }
}

export class NotFoundException extends Exception {
  constructor(
    message: string = "Resource not found",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details?: any
  ) {
    super(message, ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND, details);
  }
}

export class UnprocessableEntityException extends Exception {
  constructor(
    message: string = "Unprocessable Entity",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details?: any
  ) {
    super(
      message,
      ReasonPhrases.UNPROCESSABLE_ENTITY,
      StatusCodes.UNPROCESSABLE_ENTITY,
      details
    );
  }
}
