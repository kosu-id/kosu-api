import { type Application } from "express";

import PingRouter from "@local/modules/ping/ping.router";
import notFoundHandler from "@local/common/not-found-handler";

export default class ApiRouterHandler {
  static bind(app: Application) {
    const pingRouter = new PingRouter();

    app.use("/api/v1", pingRouter.router);

    app.use(notFoundHandler());
  }
}
