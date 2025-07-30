import type { Application } from "express";

import cors from "cors";
import express from "express";
import helmet from "helmet";

import logger from "@local/common/middlewares/logger";

export default class CommonMiddleware {
  static bind(app: Application) {
    // Add common middleware here, e.g., body parser, CORS, etc.
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use((req, res, next) => {
      logger.info(`Request received! [${req.method} ${req.url}]`);

      res.on("finish", () => {
        logger.info(`Response sent! [${req.method} ${res.statusCode}]`);
      });

      next();
    });
  }
}
