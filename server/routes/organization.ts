import { Router } from "express";
import { createOrganization, getOrganization, getDetailedOrganization, deleteOrganization, getAllOrganizations } from "../controllers/organization";
import { verifyOrganizationAccess, verifyToken } from "../middleware/auth";
import { InviteOrUpdate } from "../controllers/organizationUsers";

const router = Router();

router.post("", verifyToken as any , createOrganization as any);
router.get("/:id", getOrganization as any)
router.get("/organizations/all", getAllOrganizations as any)
router.get("/:id/detailed", verifyToken as any, getDetailedOrganization as any)
router.delete("/:id", verifyToken as any, deleteOrganization as any);

// USERS
router.post("/users", verifyToken as any, verifyOrganizationAccess as any, InviteOrUpdate as any)


export default router;