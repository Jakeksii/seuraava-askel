import { Router } from "express";
import { createVerifyEmail, forgotPassword, login, refreshToken, register, resetPassword, verifyEmail } from "../controllers/auth";
import { verifyToken } from "../middleware/auth";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 8,
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false
});

const router: Router = Router();

router.post("/register", limiter as any, register as any);
router.post("/login", limiter as any, login as any);
router.post("/forgot-password", limiter as any, forgotPassword as any)
router.post("/reset-password", limiter as any, resetPassword as any)
router.post("/verify-email", limiter as any, verifyEmail as any)

router.get("/token", limiter as any, verifyToken as any, refreshToken as any)
router.get("/create-verify-email", limiter as any, verifyToken as any, createVerifyEmail as any)

export default router;