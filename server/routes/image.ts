// @ts-nocheck
import { Router } from "express";
import { Delete, Get, Update, Upload } from "../controllers/images";
import { verifyOrganizationAccess, verifyToken } from "../middleware/auth";
import { uploadImage } from "../middleware/storage";

const router: Router = Router();

// AUTHENTICATED
router.get("", verifyToken, verifyOrganizationAccess, Get)
router.post("", verifyToken, verifyOrganizationAccess, uploadImage, Upload);
router.delete("", verifyToken, verifyOrganizationAccess, Delete)
router.patch("", verifyToken, verifyOrganizationAccess, Update)

export default router;