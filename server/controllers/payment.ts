import { Request, Response } from "../types";
import { PaytrailClient } from "@paytrail/paytrail-js-sdk";

const paytrail = new PaytrailClient({
    merchantId: 375917,
    secretKey: 'SAIPPUAKAUPPIAS',
    platformName: 'test'
})

export async function PaytrailCreatePayment(req: Request, res: Response) {
    try {

        const payment = await paytrail.createPayment({
            stamp: "d2568f2a-e4c6-40ba-a7cd-d573382ce548",
            reference: "1234",
            amount: 50,
            currency: "EUR",
            language: "FI",
            redirectUrls: {
                success: "https://ecom.example.org/success",
                cancel: "https://ecom.example.org/cancel"
            },
            customer: {
                email: "erja.esimerkki@example.org"
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