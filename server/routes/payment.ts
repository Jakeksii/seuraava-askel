import { Router } from "express";
import { PaytrailCreatePayment } from "../controllers/payment";

const router = Router();

// Public api
router.post("/paytrail/create-payment", PaytrailCreatePayment as any)

export default router