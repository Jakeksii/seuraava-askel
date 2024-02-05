import { Router } from "express";
import { Event, Organization } from "../../connections/MainConnection";
import { verifyToken } from "../../middleware/auth";
import { Request, Response } from "../../types";
import images from "./images.json";
import meta from "./meta.json";
import organization from "./organizations.json";
import mock from './MOCK_DATA.json'
import slogans from './SLOGANS.json'

const router: Router = Router();
router.post("/create", verifyToken as any, CreateDummyData as any)
export { router as DummyDataRouter };

export async function CreateDummyData(req: Request, res: Response) {
    let orgDocs = new Array
    let eventDocs = new Array

    organization.forEach((org) => {
        const organizationDoc = new Organization({
            name: org.name,
            business_id: "0468712-9",
            address: {
                ...org.address
            },
            location: {
                ...org.location
            },
            contact_info: {
                email: "info@seurakunta.fi",
                phone: "0445455831"
            },
            dummydata: 'dummy1',
            contact_info_visible: true,
            visible: true,
            organization_users: [{
                user_id: req.user._id,
                user_name: req.user.first_name + " " + req.user.last_name,
                user_email: req.user.email,
                role: "owner"
            }],
            created_by: req.user._id,
            updated_by: req.user._id
        })

        orgDocs.push(organizationDoc)

        org.events.forEach((event) => {
            const [start_date, end_date] = generateRandomDates();
            const EventDoc = new Event({
                start_date: start_date,
                end_date: end_date,
                title: event.name,
                extract: event.extract ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada volutpat justo, non suscipit lacus consectetur a.",
                description: GetDescription(),
                visible: true,
                address: {
                    ...org.address
                },

                location: {
                    ...org.location
                },
                dummydata: 'dummy1',
                image_id: GetImage(),
                meta: {
                    category: event.category,
                    language: GetLanguage(),
                },
                organization: {
                    organization_id: organizationDoc._id,
                    organization_name: organizationDoc.name
                },
                created_by: req.user._id,
                updated_by: req.user._id
            })

            eventDocs.push(EventDoc)
        })
    })

    await Organization.bulkSave(orgDocs)
    await Event.bulkSave(eventDocs)

    return res.status(201).json({ orgs: orgDocs, events: eventDocs })
}

function generateRandomDates(): [Date, Date] {
    const now = new Date();
    const sameDateProbability = Math.random();

    // Start date can be up to one month in the future
    const startDate = new Date(now);
    startDate.setDate(now.getDate() + Math.random() * 30);

    // 90% chance that the dates are on the same day
    const endDate = new Date(startDate);
    if (sameDateProbability < 0.9) {
        endDate.setHours(startDate.getHours() + Math.random() * 24);
    } else {
        // Dates can be up to two days apart
        endDate.setDate(startDate.getDate() + Math.random() * 2);
    }

    return [startDate, endDate];
}

function GetDescription() {
    const lorem = "Nisi adipisicing eiusmod officia cupidatat laborum reprehenderit ut adipisicing ex eu magna adipisicing reprehenderit velit. Magna irure culpa voluptate sit velit id non fugiat. Voluptate do elit occaecat sit amet nostrud labore velit laboris non laborum magna excepteur. Sit aliqua ex duis labore excepteur. Voluptate anim culpa dolor ipsum et aliqua adipisicing. Commodo veniam sit aliqua et ullamco excepteur eu. Labore est cillum veniam labore est consectetur laborum reprehenderit do irure tempor ea esse labore. Minim ea nostrud non elit in exercitation sit culpa."
    const noLoremProbability = Math.random();
    if (noLoremProbability < 0.8) {
        return "Minim ea ullamco minim esse anim. Commodo incididunt ipsum excepteur ad reprehenderit laboris laboris commodo. Id dolor commodo irure quis laboris fugiat deserunt. Labore magna magna nostrud aliqua Labore magna magna nostrud aliqua culpa deserunt aliquip laborum dolor in. Nisi adipisicing eiusmod officia cupidatat laborum reprehenderit ut adipisicing ex eu magna adipisicing reprehenderit velit. Magna irure culpa voluptate sit velit id non fugiat. Voluptate do elit occaecat sit amet nostrud labore velit laboris non laborum magna excepteur. Sit aliqua ex duis labore excepteur. Voluptate anim culpa dolor ipsum et aliqua adipisicing. Commodo veniam sit aliqua et ullamco excepteur eu. Labore est cillum veniam labore est consectetur laborum reprehenderit do irure tempor ea esse labore. Minim ea nostrud non elit in exercitation sit culpa."
    }
    return lorem
}

function GetImage() {
    return images[Math.floor(Math.random() * images.length)];
}
function GetLanguage() {
    return meta.language[Math.floor(Math.random() * meta.language.length)];
}


// export async function CreateDummyData(req: Request, res: Response) {
//     let orgDocs = new Array
//     let eventDocs = new Array

//     mock.forEach((org, i) => {
//         const organizationDoc = new Organization({
//             name: org.name + i,
//             business_id: "0468712-9",
//             address: {
//                 street: org.address.street,
//                 city: org.address.city,
//                 state: 'Uusimaa',
//                 zipcode: org.address.zipcode,
//                 country: org.address.country,
//             },
//             location: {
//                 type: 'Point',
//                 coordinates: [org.location.longitude, org.location.latitude]
//             },
//             contact_info: {
//                 email: "info@seurakunta.fi",
//                 phone: "0445455831"
//             },
//             dummydata: 'dummy2',
//             contact_info_visible: true,
//             visible: true,
//             organization_users: [{
//                 user_id: req.user._id,
//                 user_name: req.user.first_name + " " + req.user.last_name,
//                 user_email: req.user.email,
//                 role: "owner"
//             }],
//             created_by: req.user._id,
//             updated_by: req.user._id
//         })

//         orgDocs.push(organizationDoc)

//         org.events.forEach((event) => {
//             const [start_date, end_date] = generateRandomDates();
//             const EventDoc = new Event({
//                 start_date: start_date,
//                 end_date: end_date,
//                 title: slogans[Math.floor(Math.random() * slogans.length)].slogan,
//                 extract: GetDescription(),
//                 visible: true,
//                 address: {
//                     street: org.address.street,
//                     city: org.address.city,
//                     state: 'Uusimaa',
//                     zipcode: org.address.zipcode,
//                     country: org.address.country,
//                 },
//                 location: {
//                     type: 'Point',
//                     coordinates: [org.location.longitude, org.location.latitude]
//                 },
//                 dummydata: 'dummy2',
//                 image_id: GetImage(),
//                 meta: {},
//                 organization: {
//                     organization_id: organizationDoc._id,
//                     organization_name: organizationDoc.name
//                 },
//                 created_by: req.user._id,
//                 updated_by: req.user._id
//             })

//             eventDocs.push(EventDoc)
//         })
//     }) 

//     await Organization.bulkSave(orgDocs)
//     await Event.bulkSave(eventDocs)

//     return res.status(201).json({ orgs: orgDocs, events: eventDocs })
// }


// {
//     "mappings": {
//       "dynamic": true,
//       "fields": {
//         "end_date": {
//           "type": "date"
//         },
//         "location": {
//           "indexShapes": true,
//           "type": "geo"
//         },
//         "start_date": {
//           "type": "date"
//         }
//       }
//     }
//   }