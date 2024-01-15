import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import { Types } from 'mongoose'
import { Event } from "../connections/MainConnection"
import { IEvent, Request, Response } from '../types'

export const createEvent = async (req: Request, res: Response) => {
  try {

    // Check if we have image
    if (!req.file) return res.status(400).end()
    const image = req.file.buffer

    // Get organization
    // We know that user access role to this organization is atleast 'user', because we have middleware that prevents code reaching here if no.
    const organization = req.organization

    // Create event
    const event = new Event({
      ...JSON.parse(req.body.event), // event data that client sended. Any data that is not in IEvent will be discarded.
      image_id: "", // Set after the image is uploaded to cloudinary
      organization: {
        organization_id: organization._id,
        organization_name: organization.organization_name
      },
      created_by: req.user._id,
      updated_by: req.user._id
    })

    // Validate event
    const validationError = await event.validateSync();
    if (validationError) {
      return res.status(400).json({ message: validationError.message });
    }

    // Upload the image to cloudinary
    cloudinary.uploader.upload_stream({ resource_type: "image" }, uploadDone).end(image)
    async function uploadDone(error: any, result: UploadApiResponse | undefined) {
      if (error) {
        console.error("Error in cloudinary.uploader.upload_stream\n", error);
        return res.status(500).json({ error: "Internal Server Error when uploading image" });
      }
      // Pass url to newly created event
      event.image_id = result?.public_id

      // save created event to db
      const savedEvent = await event.save()

      // return saved event to client
      return res.status(201).json({ saved_event: savedEvent })
    }

  } catch (error) {
    console.error(error)
    return res.status(500).end();
  }
}

export const getFilters = async (req: Request, res: Response) => {
  const filters = req.body.filters

  const availableFilters = await Event.aggregate([
    {
      $match: filters, // Apply your initial filters
    },
    {
      $facet: {
        denomination: [
          { $group: { _id: '$meta.denomination' } },
          { $project: { _id: 0, value: '$_id' } },
        ],
        types: [
          {
            $unwind: '$meta.types' // Split the array into individual documents
          },
          { $group: { _id: '$meta.types' } },
          { $project: { _id: 0, value: '$_id' } },
        ],
        size: [
          { $group: { _id: '$meta.size' } },
          { $project: { _id: 0, value: '$_id' } },
        ],
        language: [
          { $group: { _id: '$meta.language' } },
          { $project: { _id: 0, value: '$_id' } },
        ],
        price: [
          { $group: { _id: '$meta.price' } },
          { $project: { _id: 0, value: '$_id' } },
        ],
        online: [
          { $group: { _id: '$meta.online' } },
          { $project: { _id: 0, value: '$_id' } },
        ],
      },
    },
  ]).exec();

  return res.status(200).json(availableFilters[0])
}

export const getEvents = async (req: Request, res: Response) => {
  try {
    const location = req.body.location
    // const search = req.body.search as [
    //   { "address.city": string },
    //   { "organization.organization_name": string },
    //   { "title": string }
    // ]
    const search = req.query.s as string
    const filters = req.body.filters ?? {}

    // PAGINATE
    const page = parseInt(req.query.p as string) || 1; // Current page number
    const limit = parseInt(req.query.limit as string) || 3; // Number of items per page
    const skip = (page - 1) * limit

    let events: IEvent[]

    events = await Event.find({$text: {$search: search}}).skip(skip).limit(limit).exec()

    // if (location) {
    //   const { latitude, longitude } = location;
    //   events = await Event.aggregate([
    //     {
    //       $geoNear: {
    //         near: {
    //           type: 'Point',
    //           coordinates: [longitude, latitude],
    //         },
    //         distanceField: 'distance',
    //         spherical: true,
    //       },
    //     },
    //     {
    //       $match: filters
    //     },
    //     {
    //       $sort: {
    //         distance: 1,  // Sort by distance in ascending order (closest first)
    //         start_date: 1, // Then sort by start_date in ascending order
    //       },
    //     },
    //     // Additional stages if needed
    //   ]).skip(skip).limit(limit).exec();
    // } else {
    //   events = await Event.find({ ...filters, $or: search }).skip(skip).limit(limit).sort({ start_date: 1 }).exec()
    // }

    const data = events.map((event: IEvent) => {
      return {
        _id: event._id,
        start_date: event.start_date,
        end_date: event.end_date,
        title: event.title,
        extract: event.extract,
        address: event.address,
        image_id: event.image_id,
        meta: event.meta,
        organization: event.organization,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt
      }
    })

    return res.status(200).json(data)

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'An error occurred while fetching events' })
  }
}

export const searchEvents = async (req: Request, res: Response) => {
  try {
    const search = req.query.s as string;
    if (search.length < 3) return res.status(400).json({ message: "search term needs to be atleast 3 char long" })

    const regex = { $regex: search, $options: 'i' };
    const endDateFilter = { end_date: { $lte: new Date() } }
    const cityFilter = { 'address.city': regex }
    const organizationFilter = { 'organization.organization_name': regex }
    const titleFilter = { title: regex }
    const typesFilter = { 'meta.types': regex }

    const distinctCities = await Event.find({ $and: [cityFilter, endDateFilter] }).distinct('address.city').exec()
    const distinctTypes = await Event.find({ $and: [typesFilter, endDateFilter] }).distinct('meta.types').exec()
    const distinctOrgNames = await Event.find({ $and: [organizationFilter, endDateFilter] }).distinct('organization.organization_name').exec()
    const distinctTitles = await Event.find({ $and: [titleFilter, endDateFilter] }).distinct('title').exec()

    console.log(distinctTypes)

    const cities = distinctCities.map((data) => ({ type: 'city', data: data }))
    const types = distinctTypes.filter(item => new RegExp(search, 'i').test(item)).map((data) => ({ type: 'type', data: data }))
    const organizations = distinctOrgNames.map((data) => ({ type: 'organization', data: data }))
    const titles = distinctTitles.map((data) => ({ type: 'title', data: data }))

    const results = [...cities, ...types, ...organizations, ...titles]

    return res.status(200).json(results);

  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ error: 'An error occurred while fetching events' });
  }
}
// export const searchEvents = async (req: Request, res: Response) => {
//   try {
//     const search = req.query.s as string;
//     const searchTerm = search.toLowerCase();
//     if (searchTerm.length < 3) return res.status(400).json({ message: "search term needs to be atleast 3 char long" })

//     const regexPattern = new RegExp(`\\b${searchTerm}`, 'i');
//     const regex = { $regex: regexPattern };
//     const endDateFilter = { end_date: { $lte: new Date() } }
//     const cityFilter = { 'address.city': regex }
//     const organizationFilter = { 'organization.organization_name': regex }
//     const titleFilter = { title: regex }
//     const typesFilter = { 'meta.types': { $elemMatch: regex } };

//     const data = await Event.aggregate([
//       {
//         $match: endDateFilter
//       },
//       {
//         $facet: {
//           // distinctCities: [
//           //   { $match: cityFilter },
//           //   {
//           //     $group: {
//           //       _id: null,
//           //       values: { $addToSet: '$address.city' }
//           //     }
//           //   },
//           //   {
//           //     $project: {
//           //       _id: 0,
//           //       values: { $slice: ['$values', 5] }
//           //     }
//           //   }
//           // ],
//           distinctTypes: [
//             { $match: typesFilter },
//             {
//               $group: {
//                 _id: null,
//                 values: { $addToSet: '$meta.types' }
//               }
//             },
//             {
//               $project: {
//                 _id: 0,
//                 values: { $slice: ['$values', 5] }
//               }
//             }
//           ],
//           // distinctOrgNames: [
//           //   { $match: organizationFilter },
//           //   {
//           //     $group: {
//           //       _id: null,
//           //       values: { $addToSet: '$organization.organization_name' }
//           //     }
//           //   },
//           //   {
//           //     $project: {
//           //       _id: 0,
//           //       values: { $slice: ['$values', 5] }
//           //     }
//           //   }
//           // ],
//           // distinctTitles: [
//           //   { $match: titleFilter },
//           //   {
//           //     $group: {
//           //       _id: null,
//           //       values: { $addToSet: '$title' }
//           //     }
//           //   },
//           //   {
//           //     $project: {
//           //       _id: 0,
//           //       values: { $slice: ['$values', 5] }
//           //     }
//           //   }
//           // ]
//         }
//       }
//     ]).exec();

//     const { distinctCities, distinctTypes, distinctOrgNames, distinctTitles } = data[0];

//     console.log(distinctTypes[0])

//     // const cities = distinctCities[0] ? distinctCities[0].values.map((data: string) => ({ type: 'city', data: data })) : []
//     const types = distinctTypes[0] ? distinctTypes[0].values.map((data: string) => ({ type: 'type', data: data })) : []
//     // const organizations = distinctOrgNames[0] ? distinctOrgNames[0].values.map((data: string) => ({ type: 'organization', data: data })) : []
//     // const titles = distinctTitles[0] ? distinctTitles[0].values.map((data: string) => ({ type: 'title', data: data })) : []

//     const results = [...types]
//     return res.status(200).json(results.slice(0, 8));

//   } catch (error) {
//     console.error('Error fetching events:', error);
//     return res.status(500).json({ error: 'An error occurred while fetching events' });
//   }
// }

// Event page
export const getEventPage = async (req: Request, res: Response) => {
  const { _id } = req.params
  if (!Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ message: "Invalid Id" });
  }

  try {
    const event: IEvent | null = await Event.findById(_id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    const data = {
      _id: event._id,
      start_date: event.start_date,
      end_date: event.end_date,
      title: event.title,
      extract: event.extract,
      description: event.description,
      address: event.address,
      image_id: event.image_id,
      meta: event.meta,
      organization: event.organization,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}