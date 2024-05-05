import i18next from "i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/fi/zod.json";


i18next.init({
    lng: "fi",
    resources: {
        fi: { zod: translation },
    },
});

z.setErrorMap(zodI18nMap);

// legal: z.literal(true, {
//     errorMap: () => ({ message: "You must accept the terms & conditions" }),
// }),

// Tapahtuma
export const EXTRACT_MAX_LENGTH = 200
export const schema1 = z.object({
    title: z.string().min(3).max(50),
    extract: z.string().min(20).max(EXTRACT_MAX_LENGTH),
    image_id: z.string().min(1),
})
export type Schema1 = z.infer<typeof schema1>



// Aika
export const schema2 = z.object({
    start_date: z.date(),
    end_date: z.date(),
}).refine(data => {
    const diffInMinutes = (data.end_date.getTime() - data.start_date.getTime()) / (1000 * 60);
    return diffInMinutes >= 20; // Check if difference is at least 20 minutes
}, {
    message: "Tapahtuman keston tulee olla vähintään 20 minuuttia.",
});
export type Schema2 = z.infer<typeof schema2>



// Osoite
const useOgranizationAddressSchema = z.object({
    useOrganizationAddress: z.literal(true),
})
const useNewAddressSchema = z.object({
    useOrganizationAddress: z.literal(false),
    address: z.object({
        street: z.string({ message: "Etsi osoitetta" }).min(2, { message: "Katuosoite on pakollinen" }),
        city: z.string({ message: "Etsi osoitetta" }).min(2, { message: "Kaupunki on pakollinen" }),
        state: z.string().optional(),
        zipcode: z.string().optional(),
        country: z.string().optional(),
    }),
    location: z.object({
        coordinates: z.array(z.number(), { message: "Ei sijaintia, kokeile toista osoitetta" }),
    })

})
export const schema3 = z.discriminatedUnion("useOrganizationAddress", [useOgranizationAddressSchema, useNewAddressSchema])
export type Schema3 = z.infer<typeof schema3>



// Lisätiedot
export const schema4 = z.object({
    description: z.string().optional(),
})
export type Schema4 = z.infer<typeof schema4>