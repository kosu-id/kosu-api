import { describe, expect, it, beforeAll } from "bun:test";
import request from "supertest";

import PingRouter from "./ping.router";
import { TestServer } from "@local/common/test/server";
import { StatusCodes } from "http-status-codes";

describe("[module] Ping", () => {
  let server: TestServer;
  let pingRouter: PingRouter;

  beforeAll(async () => {
    // Initialize test server with API routing
    server = new TestServer({
      withBodyParser: true,
      withCors: false,
      withHelmet: false,
      bindRoutes: { isApi: true },
    });

    pingRouter = new PingRouter();
    server.bindRoutes(pingRouter.router);
  });

  describe("GET /api/v1/ping", () => {
    it("should return pong message with StatusCodes.OK status", async () => {
      const response = await request(server.app)
        .get("/api/v1/ping")
        .expect(StatusCodes.OK);

      expect(response.body).toEqual({ message: "pong" });
      expect(response.headers["content-type"]).toMatch(/json/);
    });
  });

  describe("POST /api/v1/ping", () => {
    it("should echo back the request data", async () => {
      const body = { data: "Hello" };

      const response = await request(server.app)
        .post("/api/v1/ping")
        .send(body)
        .expect(StatusCodes.OK);

      expect(response.body).toEqual({
        message: "pong",
        data: body.data,
      });

      expect(response.headers["content-type"]).toMatch(/json/);
    });

    it("should error when invalid body", async () => {
      await request(server.app)
        .post("/api/v1/ping")
        .send({})
        .expect(StatusCodes.UNPROCESSABLE_ENTITY);
    });
  });

  describe("GET /api/v1/ping/async", () => {
    it("should handle async operations", async () => {
      const response = await request(server.app)
        .get("/api/v1/ping/async")
        .expect(StatusCodes.OK);

      expect(response.body).toEqual({ message: "Hello world!" });
    });
  });

  describe("Error handling", () => {
    it("should return 404 for non-existent routes", async () => {
      request(server.app)
        .get("/api/v1/ping/nonexistent")
        .expect(StatusCodes.NOT_FOUND);
    });
  });
});
