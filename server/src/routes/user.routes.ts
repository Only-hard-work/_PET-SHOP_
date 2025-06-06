import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();

router.get("/:userId", UserController.getUserInfo);

export default router;
