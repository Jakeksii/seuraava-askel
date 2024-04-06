import { Request, Response } from "../types";
import { PaytrailClient } from "@paytrail/paytrail-js-sdk";
import { UUID, randomUUID } from "crypto";

// https://docs.paytrail.com/#/
const paytrail = new PaytrailClient({
    merchantId: 375917,
    secretKey: 'SAIPPUAKAUPPIAS',
    platformName: 'test'
})

export async function PaytrailCreatePayment(req: Request, res: Response) {
    try {

        const payment = await paytrail.createPayment({
            stamp: randomUUID(),
            reference: "Tuote #1", // tuotenumero esimerkiksi
            amount: 50,
            currency: "EUR",
            language: "FI",
            customer: {
                email: ""
            },
            redirectUrls: {
                success: "https://dashboard.nextep.fi/team&subscription",
                cancel: "https://dashboard.nextep.fi/statistics"
            },
            callbackUrls: { // CALL BACK API
                success: "https://dashboard.nextep.fi/api/payment/callback/success",
                cancel: "https://dashboard.nextep.fi/api/payment/callback/cancel"
            }
        })

        if(payment.status === 200) {
            // CREATE PAYMET SUCCESFULL
            return res.status(201).json(payment)
        } else {
            // CREATE PAYMENT FAILED
            return res.status(500).json({ error: "Payment creation failed" });
        }

    } catch (error) {
        console.error(error)
        return res.status(500).end()
    }
}

// https://docs.paytrail.com/#/?id=redirect-and-callback-url-parameters
export async function SuccessCallback(req: Request, res: Response) {
    console.log('/payment/callback/success', req.query)
    return res.status(200).end()
}

// https://docs.paytrail.com/#/?id=redirect-and-callback-url-parameters
export async function CancelCallback(req: Request, res: Response) {
    console.log('/payment/callback/cancel', req.query)
    return res.status(200).end()
}