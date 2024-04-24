import { Router } from "express";
import { createEvent, getEventPage, getEvents, getOrgEvents } from "../controllers/events";
import { verifyOrganizationAccess, verifyToken } from "../middleware/auth";

const router: Router = Router();

// Authenticated
router.post("/create", verifyToken as any, verifyOrganizationAccess as any, createEvent as any);
router.get("/organization-events", verifyToken as any, verifyOrganizationAccess as any, getOrgEvents as any);
router.get("/organization-events/:_id", verifyToken as any, verifyOrganizationAccess as any, getOrgEvents as any);

router.post("", getEvents as any)
router.get("/:_id", getEventPage as any)

export default router;