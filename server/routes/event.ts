import { Router } from "express";
import { createEvent, getEventPage, getEvents } from "../controllers/events";
import { verifyOrganizationAccess, verifyToken } from "../middleware/auth";
import { uploadImage } from "../middleware/storage";

const router: Router = Router();

router.post("/create", verifyToken as any, verifyOrganizationAccess as any, uploadImage as any, createEvent as any);

router.post("", getEvents as any)
router.get("/:_id", getEventPage as any)

export default router;