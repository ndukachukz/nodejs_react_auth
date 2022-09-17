import { NextFunction, Request, RequestHandler, Response } from "express";
import { AnyZodObject, z } from "zod";

export default (schema: AnyZodObject): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log({ body: req.body });
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error: any) {
      return res.status(400).json(error.errors);
    }
  };
};
