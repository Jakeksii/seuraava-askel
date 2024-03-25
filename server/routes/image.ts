// @ts-nocheck
import { Router } from "express";
import { Delete, Update, Upload } from "../controllers/images";
import { verifyOrganizationAccess, verifyToken } from "../middleware/auth";
import { uploadImage } from "../middleware/storage";

const router: Router = Router();

// AUTHENTICATED
router.post("/upload", verifyToken, verifyOrganizationAccess, uploadImage, Upload);
router.delete("/delete", verifyToken, verifyOrganizationAccess, Delete)
router.patch("/update", verifyToken, verifyOrganizationAccess, Update)

export default router;