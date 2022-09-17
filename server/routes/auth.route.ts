import express from "express";
import { LoginController, RegisterController } from "../controllers/";
import { validateReqData } from "../middleware/";
import { regUserDataSchema, loginUserDataSchema } from "../validations";

const router = express.Router();

router.post(
  "/register",
  validateReqData(regUserDataSchema),
  RegisterController
);

router.post("/login", validateReqData(loginUserDataSchema), LoginController);

export default router;
