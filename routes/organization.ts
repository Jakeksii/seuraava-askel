import { Router } from "express";
import { createOrganization, getOrganization, getDetailedOrganization, deleteOrganization } from "../controllers/organization.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

/* READ */
router.post("", verifyToken as any , createOrganization as any);
router.get("/:id", getOrganization as any)
router.get("/:id/detailed", verifyToken as any, getDetailedOrganization as any)
router.delete("/:id", verifyToken as any, deleteOrganization as any);


export default router;