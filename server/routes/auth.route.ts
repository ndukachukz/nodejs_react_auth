import express from "express";
import { LoginController, RegisterController } from "../controllers/";
import validateReqBody from "../middleware/validateReqBody";
import { regUserDataSchema } from "../validations";

const router = express.Router();

router.post(
  "/register",
  validateReqBody(regUserDataSchema),
  RegisterController
);

export default router;
