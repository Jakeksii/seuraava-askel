import { Router } from "express";
import { forgotPassword, login, refreshToken, register, resetPassword } from "../controllers/auth";
import { verifyToken } from "../middleware/auth";

const router: Router = Router();

router.post("/register", register as any);
router.post("/login", login as any);
router.get("/token", verifyToken as any, refreshToken as any)
router.post("/forgot-password", forgotPassword as any)
router.post("/reset-password", resetPassword as any)

export default router;