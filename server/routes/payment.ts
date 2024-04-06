import { Router } from "express";
import { CancelCallback, PaytrailCreatePayment, SuccessCallback } from "../controllers/payment";

const router = Router();

router.post("/paytrail/create-payment", PaytrailCreatePayment as any)

router.get("/callback/success", SuccessCallback as any)
router.get("/callback/cancel", CancelCallback as any)

export default router