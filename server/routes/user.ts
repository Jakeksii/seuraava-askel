import { Router } from "express";
import { deleteUser, getCurrentUser } from "../controllers/user";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.get("", verifyToken as any, getCurrentUser as any);
router.delete("", verifyToken as any, deleteUser as any);

export default router;