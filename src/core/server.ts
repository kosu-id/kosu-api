import express from "express";

import ApiRouterHandler from "./api-router-handler";
import CommonMiddleware from "./common-middleware";
import ExceptionHandler from "./exception-handler";

import AuthRouter from "@local/modules/auth/auth.router";

export default class Server {
  app = express();

  constructor() {
    /**
     * Initialize the Express application with necessary middlewares and routers.
     * !Important: This should be called on top of every thing
     * 
     * @reference https://www.better-auth.com/docs/installation#mount-handler
     */
    AuthRouter.bind(this.app);

    CommonMiddleware.bind(this.app);
    ApiRouterHandler.bind(this.app);
    ExceptionHandler.bind(this.app);
  }
  
}
