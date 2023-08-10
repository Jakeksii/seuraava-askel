import { Router } from "express";
import { uploadImage } from "../middleware/storage"
import { verifyToken } from "../middleware/auth.js";
import { createEvent, getEvent, getEvents, searchEvents } from "../controllers/events";

const router: Router = Router();

router.post("", verifyToken as any, uploadImage as any, createEvent as any);
router.get("", getEvents as any)
router.get("/search", searchEvents as any)
router.get("/single/:_id", getEvent as any)

export default router;