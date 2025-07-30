import express, { type Router } from "express";

import cors from "cors";
import helmet from "helmet";

import ExceptionHandler from "@local/core/exception-handler";

type TestServerOptions = {
  withBodyParser?: boolean;
  withCors?: boolean;
  withHelmet?: boolean;
  bindRoutes?: {
    isApi?: boolean;
  };
};

export class TestServer {
  app = express();
  options: TestServerOptions = {
    withBodyParser: true,
    withCors: true,
    withHelmet: true,
    bindRoutes: { isApi: false },
  };

  constructor(options: TestServerOptions = {}) {
    this.options = options;
  }

  setupMiddleware(options: TestServerOptions = {}) {
    if (options.withBodyParser === true) {
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
    }

    if (options.withCors) {
      this.app.use(cors());
    }

    if (options.withHelmet) {
      this.app.use(helmet());
    }
  }

  bindRoutes(routes: Router) {
    this.setupMiddleware(this.options);

    if (this.options.bindRoutes?.isApi) {
      this.app.use("/api/v1", routes);
    } else {
      this.app.use(routes);
    }

    ExceptionHandler.bind(this.app);
  }
}
