import type { NextFunction, Request, Response } from "express";

import { NotFoundException } from "./exceptions";

export default function notFoundHandler() {
  return (req: Request, res: Response, next: NextFunction) => {
    next(
      new NotFoundException(`Cannot find requested resource: ${req.originalUrl}`)
    );
  };
}
