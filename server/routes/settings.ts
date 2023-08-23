import { Router } from "express";
import getSettings from "../routes/settings"



// settings page stuff

const router: Router = Router();

router.get("", getSettings)

export default router;