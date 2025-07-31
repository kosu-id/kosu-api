import type { Application } from "express";

import { toNodeHandler } from "better-auth/node";
import cors from "cors";

import { auth } from "@local/modules/auth/auth.module";
import { APP_CONFIG } from "@local/common/constants";

/**
 * AuthRouter handles authentication routes using better-auth.
 * This is a special router that not implement RouterHandler
 * because it is not used in the same way as other routers.
 * It is directly bound to the Express app.
 */
export default class AuthRouter {
  static bind(app: Application) {
    app.use(cors({
        origin: [APP_CONFIG.FRONTEND_URL],
        credentials: true,
    }))

    // Bind the auth routes to the Express app
    app.all("/api/v1/auth/{*splat}", toNodeHandler(auth));
  }
}
