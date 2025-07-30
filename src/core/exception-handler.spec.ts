import { describe, expect, it } from "bun:test";
import { Router } from "express";
import request from "supertest";

import { TestServer } from "@local/common/test/server";
import { BadRequestException, NotFoundException } from "@local/common/exceptions";

describe("[core] Exception Handler", () => {
  const server = new TestServer({
    withBodyParser: true
  });

  server.bindRoutes(
    Router()
      .get("/exception/not-found", (req, res, next) => {
        next(new NotFoundException(`Resource not found: ${req.originalUrl}`));
      })
      .post("/exception/bad-request", (req, res, next) => {
        next(new BadRequestException("Invalid request data"));
      })
  );

  it("should handle NotFoundException", async () => {
    const response = await request(server.app)
      .get("/exception/not-found")
      .expect(404);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toHaveProperty("message");
    expect(response.body.error).toHaveProperty("stack");
  });

  it("Should handle BadRequestException for non JSON requests", async () => {
    const response = await request(server.app)
      .post("/exception/bad-request")
      .send("Invalid data format") // Sending non-JSON data to trigger the exception
      .expect(400);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toHaveProperty("message", "Invalid request data");
    expect(response.body.error).toHaveProperty("stack");
  });
});
