import express from "express";

import ApiRouterHandler from "./api-router-handler";
import CommonMiddleware from "./common-middleware";
import ExceptionHandler from "./exception-handler";

export default class Server {
  app = express();

  constructor() {
    CommonMiddleware.bind(this.app);
    ApiRouterHandler.bind(this.app);
    ExceptionHandler.bind(this.app);
  }
  
}
