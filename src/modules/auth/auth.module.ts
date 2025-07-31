import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { APP_CONFIG, AUTH_CONFIG, IS_DEBUG, IS_DEVELOPMENT } from "@local/common/constants";
import prisma from "@local/common/prisma";

export const auth = betterAuth({
  appName: APP_CONFIG.NAME,
  basePath: "/api/v1/auth",
  trustedOrigins: [APP_CONFIG.FRONTEND_URL],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 10 * 60,
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
    debugLogs: IS_DEVELOPMENT || IS_DEBUG,
  }),
  socialProviders: {
    google: {
      clientId: AUTH_CONFIG.GOOGLE_CLIENT_ID,
      clientSecret: AUTH_CONFIG.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      password: {
        type: "string",
        required: true,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user, ctx) => {
          console.log(
            "User create hook called, append password",
            ctx?.context.secret
          );
          return {
            data: {
              ...user,
              password: ctx?.context.secret,
            },
          };
        },
        after: async (user) => {
          console.log("User create hook after called", user);
        },
      },
    },
  },
});
