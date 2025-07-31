export const APP_CONFIG = {
    NAME: process.env.APP_NAME || "Kosu API",
    ENV: process.env.NODE_ENV || "development",
    TZ: process.env.TZ || "Asia/Jakarta",
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 8800,
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
}

export const AUTH_CONFIG = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
}

export const IS_DEVELOPMENT = APP_CONFIG.ENV === "development";
export const IS_PRODUCTION = APP_CONFIG.ENV === "production";
export const IS_TESTING = APP_CONFIG.ENV === "testing";
export const IS_DEBUG = process.env.DEBUG === "true";