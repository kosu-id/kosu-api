import { Router } from "express";
import expressAsyncHandler from "express-async-handler";

import type { RouterHandler } from "@local/common/types/router-handler";

import PingController from "./ping.controller";
import { validateBody } from "@local/common/middlewares/validator";
import PingSchema from "./ping.schema";

export default class PingRouter implements RouterHandler {
  router: Router;

  constructor() {
    this.router = Router()
      .get("/ping", PingController.ping)
      .post("/ping", validateBody(PingSchema.post), PingController.pingPost)
      .get("/ping/async", expressAsyncHandler(PingController.pingAsync))
  }
}
