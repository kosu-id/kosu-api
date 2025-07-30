import type { Request } from "express";
import z4 from "zod/v4";

export default class PingSchema {
  static get post() {
    return z4.object({
      data: z4.string().min(1, "Message is required"),
    }).strict();
  }
}
export type PingPostRequest = Request<{}, {}, z4.infer<typeof PingSchema.post>>;