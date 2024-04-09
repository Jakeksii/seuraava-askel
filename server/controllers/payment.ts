import { PaytrailClient } from "@paytrail/paytrail-js-sdk";
import { randomUUID } from "crypto";
import { Request, Response } from "../types";

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

        if (payment.status === 200) {
            // CREATE PAYMET SUCCESFULL

            // 1. WE SEND PAYTRAIL CHECKOUT LINK TO CLIENT
            // 2. CLIENT WILL REDIRECT BROWSER TO PAYTRAIL CHECKOUT
            // 3. PAYTRAIL WILL REDIRECT CLIENT BROWSER BACK TO PROVIDED SUCCESS/CANCEL REDIRECT-URLS
            // 4. PAYTRAIL API WILL CALL PROVIDED SUCCESS/CANCEL CALLBACKS WHERE OUR API WILL HANDLE PAYMENT
            return res.status(201).json({ href: payment.data.href }) 
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
    try {
        // SIGNATURE VALIDATION
        // We copy request query payload and delete signature from that payload so that we can validate Hmac signature
        const params = { ...req.query };
        delete params.signature
        // This function creates new Hmac signature from our payload: params, body using secret and then compares it to provided signature
        const validated = paytrail.validateHmac(params as any, "", req.query.signature as any, 'SAIPPUAKAUPPIAS')
        if (!validated) return res.status(401).end() // Unauthorized, Hmac calculation failed



        // HANDLE CALLBACK REQUEST
        // -----------------------
        // (Write payment info into database)
        // -----------------------
        // -----------------------
        console.log('validated', req.query)


        
        // RETURN 2** TO PAYTRAIL
        return res.status(200).end()

    } catch (error) {
        console.error(error)
        return res.status(500).end()
    }
}

// https://docs.paytrail.com/#/?id=redirect-and-callback-url-parameters
export async function CancelCallback(req: Request, res: Response) {

    try {
        // SIGNATURE VALIDATION
        // We copy request query payload and delete signature from that payload so that we can validate Hmac signature
        const params = { ...req.query };
        delete params.signature
        // This function creates new Hmac signature from our payload: params, body using secret and then compares it to provided signature
        const validated = paytrail.validateHmac(params as any, "", req.query.signature as any, 'SAIPPUAKAUPPIAS')
        if (!validated) return res.status(401).end() // Unauthorized, Hmac calculation failed
    


        // HANDLE CALLBACK REQUEST
        // -----------------------
        // (Write payment info into database)
        // -----------------------
        // -----------------------
        console.log('validated', req.query)


        
        // RETURN 2** TO PAYTRAIL
        return res.status(200).end()

    } catch (error) {
        console.error(error)
        return res.status(500).end()
    }
}