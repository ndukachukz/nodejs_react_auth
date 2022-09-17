import express, { Application, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { corsOptions } from "./config";
import { AuthRouter, UserRouter } from "./routes";

export default (app: Application) => {
  // MiddleWare
  app.use(morgan("dev"));
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/auth", AuthRouter);
  app.use("/users", UserRouter);

  app.get("/ping", async (req, res): Promise<Response> => {
    return res.send("Hello from server");
  });

  app.all("*", (req, res) => {
    res.status(404).send("<h1>404! Page not found</h1>");
  });
};
