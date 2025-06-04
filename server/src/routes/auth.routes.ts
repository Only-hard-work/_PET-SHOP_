import Router from "express";
import AuthContoller from "../controllers/auth.controller";

const router = Router();

router.post("/login", AuthContoller.login);
router.post("/register", AuthContoller.register);

export default router;
