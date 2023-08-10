import { Router } from "express";
import { register, login, refreshToken} from "../controllers/auth.js"
import { verifyToken } from "../middleware/auth.js";

const router: Router = Router();

/* READ */
router.post("/register", register as any);
router.post("/login", login as any);
router.get("/token", verifyToken as any, refreshToken as any)

export default router;