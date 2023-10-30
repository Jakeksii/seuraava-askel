import { Router } from "express";
import { getTest, postEventClicks } from "../controllers/statistics";
import { verifyToken } from "../middleware/auth";


const router = Router();

router.get("", verifyToken as any, getTest as any);
router.post("/", verifyToken as any, postEventClicks as any)

export default router;