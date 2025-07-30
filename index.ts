import http from "http";

import Server from "@local/core/server";
import { APP_CONFIG } from "@local/common/constants";
import logger from "@local/common/middlewares/logger";

const server = http.createServer(new Server().app).listen(APP_CONFIG.PORT);

server.on("listening", () => {
  logger.info(`Server is running on port ${APP_CONFIG.PORT}`);
});

server.on("error", (error) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((error as any).code === "EADDRINUSE") {
    logger.error(`Port ${APP_CONFIG.PORT} is already in use.`);
  } else {
    logger.error("Server error:", error);
  }
});
