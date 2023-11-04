import { Router } from "express";
import { accept, check, decline } from "../controllers/invitations";
import { verifyToken } from "../middleware/auth";

const router: Router = Router();

// Private api user
router.get("", verifyToken as any, check as any)
router.patch("/:id", verifyToken as any, accept as any)
router.delete("/:id", verifyToken as any, decline as any)

export default router;