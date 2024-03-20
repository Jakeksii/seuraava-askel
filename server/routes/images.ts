import { Router } from "express";
import { createContainer, createImage, getImage } from "../controllers/images";
import { uploadImage } from "../middleware/storage";

const router: Router = Router();

router.get('/:_id', getImage as any)
router.post('/container', createContainer as any)
router.post('', uploadImage as any, createImage as any )

export default router;