const SibApiV3Sdk = require('@getbrevo/brevo');
import dotevn from 'dotenv'

dotevn.config()

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
let apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = process.env.BREVO_KEY


type Contact = {
    EMAIL: string
    FIRSTNAME: string
    LASTNAME: string
}
export async function SendEmailVerificationEmail(contact: Contact, verification_url: string) {
    try {
        let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.to = [{ email: contact.EMAIL }]
        sendSmtpEmail.params = {
            "URL": verification_url,
            "contact.FIRSTNAME": contact.FIRSTNAME,
            "contact.EMAIL": contact.EMAIL
        };

        sendSmtpEmail.templateId = 1 // Email verification

        await apiInstance.sendTransacEmail(sendSmtpEmail)
        console.log('Email sent succesfully. Type: Email verification');

        return true
    } catch (error) {
        console.error(error);
        return false
    }
}

export async function SendResetPasswordEmail(contact: Contact, reset_url: string) {
    try {
        let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.to = [{ email: contact.EMAIL }]
        sendSmtpEmail.params = {
            "URL": reset_url,
            "contact.FIRSTNAME": contact.FIRSTNAME,
            "contact.EMAIL": contact.EMAIL
        };

        sendSmtpEmail.templateId = 5 // Password reset

        await apiInstance.sendTransacEmail(sendSmtpEmail)
        console.log('Email sent succesfully. Type: Password reset');

        return true
    } catch (error) {
        console.error(error);
        return false
    }
}
