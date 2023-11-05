import { Router } from "express";
import { uploadImage } from "../middleware/storage"
import { verifyToken, verifyOrganizationAccess } from "../middleware/auth";
import { createEvent, getEventPage, getEvents, getFilters, searchEvents } from "../controllers/events";

const router: Router = Router();

router.post("", getEvents as any)
router.post("/create", verifyToken as any, verifyOrganizationAccess as any, uploadImage as any, createEvent as any);

router.get("/search", searchEvents as any)
router.get("/:_id", getEventPage as any)
router.post("/filters", getFilters as any)

export default router;