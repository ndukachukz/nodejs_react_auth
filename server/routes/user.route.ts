import express from "express";
import { getUser } from "../controllers/user";
import validateReqBody from "../middleware/validateReqData";
import { getUserSchema } from "../validations";

const router = express.Router();

router.get("/:id", validateReqBody(getUserSchema), getUser);

export default router;
