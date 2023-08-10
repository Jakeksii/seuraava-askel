import { Router } from "express";
import { createOrganizationPage, findOrganizationPage } from "../controllers/organizationPage.js";
import { verifyToken } from "../middleware/auth.js";
import { uploadImage } from "../middleware/storage.js";

const router = Router();

/* READ */
router.post("", verifyToken as any, uploadImage as any, createOrganizationPage as any);
router.get("", findOrganizationPage as any)

export default router;