import { Router } from "express";
import { createOrganization, deleteOrganization, getDetailedOrganization, getOrganization } from "../controllers/organization";
import { InviteOrUpdate } from "../controllers/organizationUsers";
import { verifyOrganizationAccess, verifyToken } from "../middleware/auth";

const router = Router();

// Public api
router.get("/:id", getOrganization as any)

// Private api
router.post("", verifyToken as any , createOrganization as any);
router.get("", verifyToken as any, verifyOrganizationAccess as any, getDetailedOrganization as any)
router.delete("/:id", verifyToken as any, deleteOrganization as any);

// USERS
router.post("/users", verifyToken as any, verifyOrganizationAccess as any, InviteOrUpdate as any)

export default router;