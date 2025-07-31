import type { Application } from "express";

import cors from "cors";
import express from "express";
import helmet from "helmet";

import logger from "@local/common/middlewares/logger";
import { APP_CONFIG } from "@local/common/constants";

export default class CommonMiddleware {
  static bind(app: Application) {
    // Add common middleware here, e.g., body parser, CORS, etc.
    app.use(cors({
      origin: [APP_CONFIG.FRONTEND_URL], 
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    }));
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
