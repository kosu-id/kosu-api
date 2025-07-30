import type { NextFunction, Request, Response } from "express";
import type { PingPostRequest } from "./ping.schema";

export default class PingController {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static ping(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({ message: "pong" });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async pingAsync(req: Request, res: Response, next: NextFunction) {
        const response = await new Promise(resolve => {
            setTimeout(() => resolve('Hello world!'), 1000); // Simulate async operation
        });
        
        res.status(200).json({ message: response });
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static pingPost(req: PingPostRequest, res: Response, next: NextFunction) {
        res.status(200).json({ message: "pong", data: req.body.data });
    }
}