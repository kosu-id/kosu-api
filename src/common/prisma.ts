import { PrismaClient } from "@local/prisma/generated/client";
import logger from "./middlewares/logger";

const prisma = new PrismaClient({
    log: [
        { emit: "stdout", level: "query" },
        { emit: "stdout", level: "info" },
        { emit: "stdout", level: "warn" },
        { emit: "stdout", level: "error" },
    ]
});

prisma.$on("query", (e) => {
    logger.debug(`Query: ${e.query}`);
    logger.debug(`Params: ${e.params}`);
    logger.debug(`Duration: ${e.duration}ms`);
});

export default prisma;